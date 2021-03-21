import React, {useState, useLayoutEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Platform,
    TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Subject from '../../../store/attendance/containers/subject';

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
    }
});

const Time = (props) => {
    const {navigation, route, setAttendanceDateTime} = props;
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(true);

    const goTo = (screen) => {
        navigation.navigate(screen, {
            selectedClass: route.params.selectedClass,
            selectedDate: date
        });
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}}>
                    <Button onPress={() => goTo('Attendance')} title="NEXT" />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

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

    /* const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    }; */

    return (
        <View>
            {/* <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View> */}
            <View>
                <Text style={styles.dateStyle}>
                    {route.params.selectedClass}
                </Text>
                <Text style={styles.dateStyle}>{formatDate(date)}</Text>
                <Text style={styles.timeStyle}>{formatTime(date)}</Text>
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

            <Subject navigation={navigation} />
        </View>
    );
};

export default Time;
