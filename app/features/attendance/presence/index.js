import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
import InputModal from '../../../components/inputModal'
import { Card, Title, Paragraph, withTheme } from 'react-native-paper';


const Item = ({item, onPress, backgroundColor}) => {
    return (
        // <TouchableOpacity 
        //     style={{
        //         backgroundColor, 
        //         padding: 20,
        //         paddingHorizontal: 30,
        //         borderRadius: 5,
        //         margin: 5
        //     }}
        // >
        //     <Text style={styles.attBtn}>{item.rollNo}({item.name})</Text>
        // </TouchableOpacity>
        // <View style={[styles.cardCont]}>
            <Card 
                style={[styles.card, {backgroundColor}]}
                onPress={onPress} >
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Title>{item.rollNo}</Title>
                    <Paragraph>{item.name}</Paragraph>
                </Card.Content>

                {/* <Card.Actions> */}
                    {/* <Button>Cancel</Button>
                    <Button>Ok</Button> */}
                    {/* <Button>Reason</Button> */}
                {/* </Card.Actions> */}
            </Card>
        // </View>
    )
}

const Attendance = (props) => {
    const { theme, navigation } = props
    const [studentData, setStudentData] = useState([])

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
        //[todo : open input modal for absent reason]
        // <InputModal />
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
        
    }

    return (
        <View >
            <View style={styles.countCont}>
                <Text
                    style={[styles.countBar, {backgroundColor: theme.colors.primary}]}
                >
                    {props.selectedClass}</Text>
                <Text 
                    style={[styles.countBar, {backgroundColor: theme.colors.green}]}>
                        Total Students : {studentData.length} </Text>
                <Text 
                    style={[styles.countBar, {backgroundColor: theme.colors.red}]}>
                        Absent Students : {countAbsent()}</Text>
            </View>
            {/* <Button onPress={submitAttendance} title='Submit'/> */}
            <FlatList
                data={studentData}
                renderItem={renderItem}
                keyExtractor={(item) => item.rollNo.toString()}
                numColumns="3"
            />
            {/* <Button 
                onPress={submitAttendance}
                title='Submit'
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '48%', 
        margin: '1%', 
        aspectRatio: 1,
        borderRadius: 5
    },
    attBtn: {
        fontSize: 14
    },
    countCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    countBar: {
        backgroundColor:'#fff',
        width: '50%',
        textAlign: 'center',
        padding: 10,
        margin: 2,
        borderRadius: 5

    }

})



export default withTheme(Attendance);