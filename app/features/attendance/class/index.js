import React, {useState, useEffect} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet
    // list,
    // TouchableOpacity,
    // Button
} from 'react-native';
import {withTheme, List, Colors} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
        backgroundColor: Colors.white
    },
    title: {
        fontSize: 20
    },
    status: {
        fontSize: 10
    }
});

const Item = ({item, onPress, style, status}) => (
    <List.Item
        style={[styles.item, style]}
        title={item.title}
        description={status}
        onPress={onPress}
        left={(prop) => <List.Icon {...prop} icon="account-group" />}
        right={(prop) => <List.Icon {...prop} icon="play" />}
    />
);

const Class = (props) => {
    const {
        navigation,
        // theme,
        fetchClassesResponse,
        selectedClass,
        fetchClasses,
        recentAttendances,
        setClassName,
        getClasses
    } = props;
    const [selectedId, setSelectedId] = useState(null);
    const [classList, setClassList] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log('class', props);
        // [todo] check if focused condition
        if (!fetchClassesResponse) {
            getClasses();
        }
        if (selectedClass) {
            setSelectedId(selectedClass);
        }
        if (fetchClassesResponse) {
            setClassList(fetchClassesResponse);
        }
    }, [isFocused]);

    useEffect(() => {
        if (fetchClassesResponse) {
            setClassList(fetchClassesResponse);
        }
    }, [fetchClasses]);

    const goTo = (screen) => {
        let goToSreen = screen;
        if (
            recentAttendances &&
            recentAttendances[selectedClass] &&
            recentAttendances[selectedClass].attendanceId
        ) {
            goToSreen = 'Attendance';
        }

        navigation.navigate(goToSreen, {selectedClass});
    };

    const selectClass = (item) => {
        setSelectedId(item.id);
        setClassName(item.id);
        goTo('Time');
    };

    const renderItem = ({item}) => {
        // let backgroundColor = item.id === selectedId ? '#3498db' : '#ffffff';
        let backgroundColor = Colors.white;
        let status = '';
        if (
            recentAttendances &&
            recentAttendances[item.id] &&
            recentAttendances[item.id].attendanceId
        ) {
            status = 'Submitted';
            backgroundColor = Colors.green500;
        } else if (
            recentAttendances &&
            recentAttendances[item.id] &&
            recentAttendances[item.id].attendanceData
        ) {
            status = 'Saved';
            backgroundColor = Colors.orange500;
        }

        return (
            <Item
                item={item}
                onPress={() => selectClass(item)}
                style={{backgroundColor}}
                status={status}
            />
        );
    };

    /* useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}}>
                    <Button
                        onPress={() => goTo('Time')}
                        title="NEXT"
                        disabled={!selectedClass}
                    />
                </TouchableOpacity>
            )
        });
    }, [navigation, selectedClass]); */

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={classList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
};

export default withTheme(Class);
