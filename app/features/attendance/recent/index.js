import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    // Text,
    // Pressable,
    View,
    FlatList,
    TouchableOpacity,
    Button,
    StyleSheet
} from 'react-native';
import {withTheme, List, Colors} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import {toTitleCase} from '../../../libs/helper';

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
    const {onPress, item, style} = props;
    return (
        <List.Item
            style={[styles.item, style]}
            title={toTitleCase(item.className)}
            description={item.isSubmitted ? 'Submitted' : 'Saved'}
            onPress={() => onPress(item)}
            left={(prop) => (
                <List.Icon
                    {...prop}
                    icon={item.isSubmitted ? 'check' : 'clock-o'}
                />
            )}
            right={(prop) => <List.Icon {...prop} icon="play" />}
        />
        // <Pressable
        //     style={[styles.item, {backgroundColor}]}
        //     onPress={() => onPress(item)}
        // >
        //     <Text style={styles.itemText}>
        //         {' '}
        //         <Icon
        //             name={item.isSubmitted ? 'check' : 'clock-o'}
        //             size={30}
        //         />{' '}
        //         {item.className}
        //     </Text>
        // </Pressable>
    );
};

const RecentAttendance = (props) => {
    console.log('recent', props);
    const {navigation, recentAttendances, setClassName, theme} = props;
    const [recentAttendanceList, setRecentAttendanceList] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (recentAttendances) {
            const list = Object.keys(recentAttendances).map((item) => {
                return {
                    className: item,
                    isSubmitted: !!recentAttendances[item].attendanceId
                };
            });
            setRecentAttendanceList(list);
        }
    }, [isFocused]);

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

    const onSelectAttendance = (item) => {
        setClassName(item.className);
        if (!item.isSubmitted) {
            goTo('Time');
        } else {
            goTo('Attendance');
        }
    };

    const renderItem = ({item}) => {
        const backgroundColor = item.isSubmitted
            ? Colors.green500
            : Colors.orange500;
        // item.index = index;
        return (
            <ListItem
                item={item}
                onPress={onSelectAttendance}
                style={{backgroundColor}}
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
                keyExtractor={(item) => item.className.toString()}
                // numColumns="2"
            />
        </View>
    );
};

export default withTheme(RecentAttendance);
