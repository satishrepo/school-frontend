import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    View,
    FlatList,
    Pressable,
    TouchableOpacity,
    Button,
    Text,
    StyleSheet
} from 'react-native';
import {withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    item: {
        padding: 20,
        marginVertical: 8,
        // marginHorizontal: 16,
        borderRadius: 5
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'flex-start'
    },
    itemText: {
        fontSize: 30
        // color: 'red'
    },
    title: {
        fontSize: 20
    },
    status: {
        fontSize: 10
    }
});

const ListItem = (props) => {
    const {onPress, item, backgroundColor} = props;
    return (
        <Pressable
            // disabled={disabled}
            style={[styles.item, {backgroundColor}]}
            onPress={() => onPress()}
        >
            <Text style={styles.itemText}>
                {' '}
                <Icon name="clock-o" size={30} /> {item}
            </Text>
        </Pressable>
    );
};

const RecentAttendance = (props) => {
    console.log(props);
    const {navigation, recentAttendances, theme} = props;
    const [recentAttendanceList, setRecentAttendanceList] = useState([]);

    useEffect(() => {
        if (recentAttendances) {
            const list = Object.keys(recentAttendances);
            setRecentAttendanceList(list);
        }
    }, []);

    const goTo = (screen) => {
        navigation.navigate(screen);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{marginRight: theme.margin.headerRight}}
                >
                    <Button
                        onPress={() => goTo('Class')}
                        title="NEW ATTENDANCE"
                        // disabled={!selectedClass}
                    />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const onSelectAttendance = () => {
        console.log('onSelectAttendance');
    };

    const renderItem = ({item}) => {
        const backgroundColor = recentAttendances[item].attendanceId
            ? theme.colors.green
            : theme.colors.primary;
        // item.index = index;
        return (
            <ListItem
                item={item}
                onPress={onSelectAttendance}
                backgroundColor={backgroundColor}
                // showReason={showReason}
                // disabled={readOnly}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                // style={styles.flatList}
                data={recentAttendanceList}
                renderItem={renderItem}
                keyExtractor={(item) => item.toString()}
                // numColumns="2"
            />
        </View>
    );
};

export default withTheme(RecentAttendance);
