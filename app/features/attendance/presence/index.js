import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import InputModal from '../../../components/inputModal'
import { Card, Title, Paragraph, withTheme, Avatar, Chip } from 'react-native-paper';
import { toTitleCase } from '../../../libs/helper'


const Item = ({item, onPress, backgroundColor}) => {
    return (
        <TouchableOpacity 
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
                            icon={item.isPresent ? 'check': 'cancel'} 
                            style={{backgroundColor}}
                            onPress={() => onPress()}>{item.isPresent ? 'Present': 'Absent'}</Chip>
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
        
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
    const [studentData, setStudentData] = useState([])
    const [showReasonModal, setShowReasonModal] = useState(false)
    const [currentStudent, setCurrentStudent] = useState(null)

    useEffect(() => {
        if (!props.fetchStudentsResponse) {
            props.getStudents(props.selectedClass)
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity 
                style={{marginRight: 20}}>
                <Button 
                    onPress={() => submitAttendance()} 
                    title={"SUBMIT"}
                    // disabled={!props.selectedClass}
                />
            </TouchableOpacity>
          )
        });
    }, [navigation, props, studentData]);

    useEffect(() => {

        if (props.fetchStudentsResponse) {
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


    const markAttendance = (item, index) => { 
        setCurrentStudent(item)
        // if (item.isPresent) {
            setShowReasonModal(true)
        // }
        item.isPresent = !item.isPresent
        let sData = [...studentData]
        setStudentData(sData)
        props.setClassAttendance({[props.selectedClass] : sData})
    }

    const renderItem = ({ item, index }) => { 
        
        const backgroundColor = item.isPresent ? theme.colors.green : theme.colors.red;

        return (
            <Item 
                item={item} 
                onPress={() => markAttendance(item, index)} 
                backgroundColor={backgroundColor}
            />
        )
    }

    const countAbsent = () => {
        const total = studentData.filter( item => !item.isPresent)
        return total.length
    }

    const submitAttendance = () => {
        
        props.setClassAttendance({[props.selectedClass] : studentData})
        const data = {
            className: props.selectedClass,
            attendanceDate: props.attendanceDate || new Date().toISOString(),
            attendanceData: studentData
        }
        props.saveAttendance(data)
        
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
            <View style={styles.cardCont}>
                <FlatList
                    data={studentData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.rollNo.toString()}
                    // numColumns="2"
                />
            </View>
            <InputModal showModal={showReasonModal} item={currentStudent}/>
        </View>
    )
}

const styles = StyleSheet.create({
    cardCont: {
        // display: 'flex',
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
        // flexWrap: 'wrap'
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
        // flexGrow: 2,
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