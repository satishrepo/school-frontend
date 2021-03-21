import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    View,
    FlatList,
    Pressable,
    TouchableOpacity,
    Button,
    Text
} from 'react-native';
import {withTheme} from 'react-native-paper';

const ListItem = (props) => {
    const {onPress, item} = props;
    return (
        <Pressable
            // disabled={disabled}
            // style={[styles.userList]}
            onPress={() => onPress()}
        >
            <Text>{item}</Text>
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
                <TouchableOpacity>
                    <Button
                        onPress={() => goTo('Class')}
                        title="NEXT"
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
        // const backgroundColor = item.isPresent
        //     ? theme.colors.green
        //     : theme.colors.red;
        // item.index = index;
        return (
            <ListItem
                item={item}
                onPress={onSelectAttendance}
                // backgroundColor={backgroundColor}
                // showReason={showReason}
                // disabled={readOnly}
            />
        );
    };

    return (
        <View>
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
