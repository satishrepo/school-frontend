import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    // list,
    TouchableOpacity,
    Button
} from 'react-native';
import {withTheme, List} from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5
    },
    title: {
        fontSize: 20
    },
    status: {
        fontSize: 10
    }
});

const Item = ({item, onPress, style, status}) => (
    // <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    //     <Text style={styles.title}>{item.title}</Text>
    //     <Text style={styles.status}>{status}</Text>
    // </TouchableOpacity>
    <List.Item
        style={[styles.item, style]}
        title={item.title}
        description={status}
        onPress={onPress}
        left={(prop) => <List.Icon {...prop} icon="account-group" />}
    />
);

const Class = (props) => {
    const {
        navigation,
        theme,
        fetchClassesResponse,
        selectedClass,
        fetchClasses,
        recentAttendances,
        setClassName,
        getClasses
    } = props;
    const [selectedId, setSelectedId] = useState(null);
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        console.log(props);
        if (!fetchClassesResponse) {
            getClasses();
        }
        if (selectedClass) {
            setSelectedId(selectedClass);
        }
    }, []);

    useEffect(() => {
        if (fetchClassesResponse) {
            setClassList(fetchClassesResponse);
        }
    }, [fetchClasses]);

    const selectClass = (item) => {
        setSelectedId(item.id);
        setClassName(item.id);
    };

    const renderItem = ({item}) => {
        let backgroundColor = item.id === selectedId ? '#3498db' : '#ffffff';
        let status = '';
        if (
            recentAttendances &&
            recentAttendances[item.id] &&
            recentAttendances[item.id].attendanceId
        ) {
            status = 'Submitted';
            backgroundColor = theme.colors.green;
        } else if (
            recentAttendances &&
            recentAttendances[item.id] &&
            recentAttendances[item.id].attendanceData
        ) {
            status = 'Saved';
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

    useLayoutEffect(() => {
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
    }, [navigation, selectedClass]);

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
