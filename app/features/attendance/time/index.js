import React, {useState} from 'react';
import {
    // TouchableOpacity,
    // Text,
    Platform,
    StyleSheet,
    View
} from 'react-native';
import {List, Colors, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
// import Subject from '../../../store/attendance/containers/subject';
import {toTitleCase} from '../../../libs/helper';
import {ButtonStyle} from '../../../styles';

const styles = StyleSheet.create({
    dateStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#13AC00',
        textAlign: 'center',
        paddingVertical: 10
    },
    timeStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: '#00D043',
        textAlign: 'center',
        paddingVertical: 10
    },
    item: {
        backgroundColor: Colors.white,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 5
    },
    btnGroupCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    }
});

const Time = (props) => {
    const {
        navigation,
        setAttendanceDateTime,
        selectedClass,
        selectedSubject
    } = props;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(true);

    const goTo = (screen) => {
        navigation.navigate(screen);
    };

    /* useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}}>
                    <Button onPress={() => goTo('Attendance')} title="NEXT" />
                </TouchableOpacity>
            )
        });
    }, [navigation]); */

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(event, selectedDate, currentDate);
        setAttendanceDateTime(selectedDate);
    };

    const formatDate = (inputDate) => {
        return inputDate.toDateString();
    };

    const formatTime = (input) => {
        let hours = input.getHours();
        let minutes = input.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        const strTime = `${hours}: ${minutes}`;
        return `${strTime} ${ampm}`;
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>
            {/* 
                <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                </View> 
                <View>
                    <Button onPress={showTimepicker} title="Select Time" />
                </View>
            */}
            <View>
                <List.Item
                    key="selectedClass"
                    style={[styles.item]}
                    title={toTitleCase(selectedClass)}
                    description={toTitleCase(selectedClass)}
                    onPress={() => goTo('Class')}
                    left={(prop) => (
                        <List.Icon {...prop} icon="account-group" />
                    )}
                    // right={(prop) => <List.Icon {...prop} icon="play" />}
                />
                <List.Item
                    key="selectedSubject"
                    style={[styles.item]}
                    title={toTitleCase(selectedSubject)}
                    description={toTitleCase(selectedSubject)}
                    onPress={() => goTo('Subject')}
                    left={(prop) => <List.Icon {...prop} icon="text-subject" />}
                    // right={(prop) => <List.Icon {...prop} icon="play" />}
                />
                <List.Item
                    key="selectedTime"
                    style={[styles.item]}
                    title={formatDate(date)}
                    description={formatTime(date)}
                    // onPress={() => goTo('Subject')}
                    left={(prop) => <List.Icon {...prop} icon="clock" />}
                    // right={(prop) => <List.Icon {...prop} icon="play" />}
                />
                <View style={styles.btnGroupCont}>
                    <Button
                        icon="clock"
                        style={ButtonStyle.primary}
                        labelStyle={{color: Colors.black}}
                        onPress={showTimepicker}
                    >
                        Change Time
                    </Button>
                    <Button
                        icon="telegram"
                        style={ButtonStyle.primary}
                        labelStyle={{color: Colors.black}}
                        onPress={() => goTo('Attendance')}
                    >
                        NEXT
                    </Button>
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                />
            )}

            {/* <Subject navigation={navigation} /> */}
        </View>
    );
};

export default Time;
