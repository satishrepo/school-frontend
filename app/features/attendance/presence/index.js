import React, { useState, useEffect, useLayoutEffect } from 'react';
import { 
    StyleSheet, Text, View, ScrollView, ActivityIndicator,
    FlatList, TouchableOpacity, Button, Pressable } from 'react-native';
import InputModal from './inputModal'
import { 
    Card, Title, Paragraph, withTheme, Avatar, Chip, IconButton, Colors
} from 'react-native-paper';
import DialogBox from '../../../components/dialog'
import { toTitleCase } from '../../../libs/helper'

const CONFIRM_ATTENDANCE = {
    title: 'Are you sure ?',
    content: 'This will permanently save attendance data, are you sure you want to do this ?'
}

const Item = ({item, onPress, backgroundColor, showAbsentReason, disabled}) => {
    return (
        <Pressable 
            disabled={disabled}
            style={[styles.userList]}
            onPress={onPress}>
            <Avatar.Image 
                size={60} 
                style={[styles.avatar]}
                source={{ uri: 'https://picsum.photos/700' }} />
            <View>
                <Text style={styles.name}>{toTitleCase(item.name)} </Text>
                <View style={styles.chipCont}>
                    <Text style={styles.rollNo}>
                        #{item.rollNo} 
                    </Text>
                    <Text>
                        <Chip 
                            disabled={disabled}
                            icon={item.isPresent ? 'check': 'cancel'} 
                            style={{backgroundColor}}
                            onPress={onPress}>{item.isPresent ? 'Present': 'Absent'}</Chip>
                    </Text>
                    <Text>
                        {
                            !item.isPresent && item.absentReason ?
                            <IconButton
                                icon="comment"
                                color={Colors.red500}
                                size={20}
                                onPress={(e) => showAbsentReason(e, item)}/>
                            : ''
                        }
                    </Text>
                </View>
            </View>
        </Pressable>
        
            // <Card 
            //     style={[styles.card, {backgroundColor}]}
            //     onPress={onPress} >
            //     <Card.Cover 
            //         source={{ uri: 'https://picsum.photos/700' }} 
            //         resizeMode={`cover`} 
            //         style={{flexDirection: 'column', height: '70%'}}/>
            //     <Card.Content>
            //         <Title>#{item.rollNo}</Title>
            //         <Paragraph>{item.name.toUpperCase()}</Paragraph>
            //     </Card.Content>

                /* <Card.Actions> */
                    /* <Button>Cancel</Button>
                    <Button>Ok</Button> */
                    /* <Button>Reason</Button> */
                /* </Card.Actions> */
            // </Card>
        
    )
}

const Attendance = (props) => {

    const { theme, navigation } = props
    const todayDate = new Date().getDate()
    const [studentData, setStudentData] = useState([])
    const [readOnly, setReadOnly] = useState(false)
    const [currentStudent, setCurrentStudent] = useState(null)
    const [viewReason, setViewReason] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        console.log(props)
        // if (!props.fetchStudentsResponse || !props.fetchStudentsResponse[props.selectedClass]) {
        //     props.getStudents(props.selectedClass)
        // }

        if (
            (!props.fetchStudentsResponse || !props.fetchStudentsResponse[props.selectedClass]) &&
            (!props.recentAttendances || !props.recentAttendances[props.selectedClass]) 
        ) {
            props.getStudents(props.selectedClass)
        }

        // if attendanceId present in current attendance 
        // then make page readOnly
        if (props.recentAttendances && 
            props.recentAttendances[props.selectedClass] &&
            props.recentAttendances[props.selectedClass].attendanceId
        ) {
            setReadOnly(true)
        }

        // if (props.recentAttendances && props.recentAttendances[props.selectedClass]) {
        //     console.log('setting data in current attendance')
        //     props.setClassAttendance(props.recentAttendances[props.selectedClass])
        // }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity 
                style={{marginRight: 20}}>
                <Button 
                    onPress={() => setShowConfirm(true)} 
                    title={readOnly ? "SUBMITTED" : "SUBMIT"}
                    disabled={
                        props.fetchStudents ||
                        !studentData.length ||
                        readOnly
                    }
                />
            </TouchableOpacity>
          )
        });
    }, [navigation, props, studentData, readOnly, setShowConfirm]);


    useEffect(() => {
        // console.log('current Attendance', props.currentAttendance)
        // if (props.currentAttendance && 
        //     props.currentAttendance[props.selectedClass] &&
        //     props.currentAttendance[props.selectedClass].attendanceId
        // ) {
            //     setReadOnly(true)
            // }
            
        

        
        // get from recent attendance
        // if not then get from current attendance 
        // if not then get from api

        if(props.recentAttendances && props.recentAttendances[props.selectedClass]) {
            console.log('1')
            setStudentData(props.recentAttendances[props.selectedClass].attendanceData)

        } 
        // else if (props.currentAttendance && props.currentAttendance[props.selectedClass]) {
        //     console.log('2')
        //     setStudentData(props.currentAttendance[props.selectedClass].attendanceData)

        // } 
        else if (props.fetchStudentsResponse) {
            console.log('3', props.fetchStudentsResponse)
            let data = props.fetchStudentsResponse[props.selectedClass] 
                    ? props.fetchStudentsResponse[props.selectedClass].map( item => {
                return {
                    ...item,
                    isPresent : item.isPresent || true
                }
            }) : []

            setStudentData(data)
        }
    }, [props.fetchStudentsResponse])

    useEffect(() => {
        // save response of submitted attendance object
        if (props.submitAttendanceResponse) {
            props.setClassAttendance({[props.selectedClass] : props.submitAttendanceResponse })
            props.saveRecentAttendance({[props.submitAttendanceResponse.className] : props.submitAttendanceResponse})
        }
    }, [props.submitAttendanceResponse])


    const markAttendance = (item, index) => {
            
        item.isPresent = !item.isPresent
        item['index'] = index

        setCurrentStudent(item)
        let sData = [...studentData]
        setStudentData(sData)
    }

    const renderItem = ({ item, index }) => { 
        
        const backgroundColor = item.isPresent ? theme.colors.green : theme.colors.red;

        return (
            <Item 
                item={item} 
                onPress={() => markAttendance(item, index)} 
                backgroundColor={backgroundColor}
                showAbsentReason={showAbsentReason}
                disabled={readOnly}
            />
        )
    }

    const countAbsent = () => {
        const total = studentData.filter( item => !item.isPresent)
        return total.length
    }

    const submitAttendance = () => {

        // props.setClassAttendance({[props.selectedClass] : {
        //     attendanceData: studentData
        // }})
        const data = {
            className: props.selectedClass,
            attendanceDate: props.attendanceDate || new Date().toISOString(),
            attendanceData: studentData
        }
        props.saveAttendance(data)
        
    }

    const replyConfirm = (result) => {
        if (result) {
            submitAttendance()
        }
        setShowConfirm(false)
    }

    const updateAbsentReason = (reasonObject) => {
        let student = {...currentStudent}
        student.absentReason = reasonObject
        setCurrentStudent(null)
        setViewReason(false)
        let sData = [...studentData]
        sData[reasonObject.studentIndex]['absentReason'] = reasonObject.reason
        setStudentData(sData)
        props.setClassAttendance({[props.selectedClass] : {
            attendanceData: sData
        }})
        props.saveRecentAttendance({[props.selectedClass] : {
            attendanceData: sData
        }})
    }

    const showAbsentReason = (e, item) => {
        e.preventDefault()
        setViewReason(true)
        setCurrentStudent(item)
        let sData = [...studentData]
        setStudentData(sData)
    }

    const onCancelAbsent = (indexObj) => {
        setCurrentStudent(null)
        setViewReason(false)
        if (!indexObj.viewReason) {
            let sData = [...studentData]
            sData[indexObj.index].isPresent = !sData[indexObj.index].isPresent
            delete sData[indexObj.index]['absentReason']
            setStudentData(sData)
        }
    }

    return (
        <View >
            
            <View style={styles.countBarCont}>
                <Text
                    style={[styles.countBar, {color: theme.colors.darkBlue}, {backgroundColor: theme.colors.primary}]}
                >{toTitleCase(props.selectedClass)}</Text>
                <Text 
                    style={[styles.countBar, {color: theme.colors.darkGreen}, {backgroundColor: theme.colors.green}]}
                    >Total Students : {studentData.length} </Text>
                <Text 
                    style={[styles.countBar,{color: theme.colors.darkRed}, {backgroundColor: theme.colors.red}]}
                    >Absent Students : {countAbsent()}</Text>
            </View>
            {
                studentData.length ? (
                    <ScrollView style={styles.userListCont}>
                        <FlatList
                            style={styles.flatList}
                            data={studentData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.rollNo.toString()}
                            // numColumns="2"
                        />
                    </ScrollView>
                ) : props.fetchStudents ? <ActivityIndicator size="large" /> : <Text>Could not load students</Text>
            }
            {
                currentStudent 
                ? <InputModal 
                    onCancelAbsent={onCancelAbsent}
                    readOnly={readOnly}
                    item={currentStudent} 
                    onAbsentReason={updateAbsentReason} 
                    viewReason={viewReason} />
                : <Text></Text>
            }

            <DialogBox data={CONFIRM_ATTENDANCE} showConfirm={showConfirm} reply={replyConfirm}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    userListCont: {
        // display: 'flex',
    },
    flatList: {
        paddingBottom: 50
    },
    card: {
        width: '48%', 
        margin: '1%', 
        aspectRatio: 1,
        borderRadius: 5
    },
    attBtn: {
        fontSize: 14
    },
    countBarCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    countBar: {
        backgroundColor: 'white',
        width: '30%',
        textAlign: 'center',
        padding: 5,
        margin: 2,
        borderRadius: 5,
        fontWeight: '500',
    },
    userList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'white'
    },
    avatar: {
        marginRight: 10
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
    rollNo: {
        marginRight: 10,
        paddingTop: 5,
        fontWeight: '500',
        fontSize: 15
    },
    chipCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor: 'red',
        borderStyle: 'solid'
    }


})



export default withTheme(Attendance);