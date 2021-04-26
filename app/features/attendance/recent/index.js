import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    // Pressable,
    // ImageBackground,
    // Image,
    // Button,
    // TouchableOpacity,
    Text,
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withTheme, List, Colors, Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/native';
import {toTitleCase} from '../../../libs/helper';
import {ButtonStyle, TextStyle} from '../../../styles';
import AttendanceFab from '../../../components/attendanceFab';
// import backgroundImage from '../../../../assets/images/backgrounds/kid-hi.png';

const styles = StyleSheet.create({
    container: {
        // padding: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white
    },
    noDataContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%'
    },
    flatList: {
        margin: 20
    },
    item: {
        padding: 20,
        marginVertical: 8,
        borderRadius: 5
        // marginHorizontal: 16,
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
    },
    image: {
        height: '80%',
        width: '80%',
        resizeMode: 'stretch'
        // flex: 1,
        // resizeMode: 'cover',
        // justifyContent: 'center'
    },
    attendanceBtn: {
        ...ButtonStyle.primary
    },
    headerButton: {
        ...ButtonStyle.header
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
                    icon={item.isSubmitted ? 'check' : 'clock-outline'}
                />
            )}
            right={(prop) => <List.Icon {...prop} icon="play" />}
        />
    );
};

const RecentAttendance = (props) => {
    console.log('recent', props);
    const {navigation, recentAttendances, setClassName, theme} = props;
    const [recentAttendanceList, setRecentAttendanceList] = useState([]);
    // const image = '../../../assets/images/backgrounds/water-drop.jpg';
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

    /* useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{marginRight: theme.margin.headerRight}}
                >
                    <Button
                        icon="telegram"
                        style={styles.headerButton}
                        labelStyle={{color: Colors.white}}
                        onPress={() => goTo('Class')}
                    >
                        NEW ATTENDANCE
                    </Button>
                </TouchableOpacity>
            )
        });
    }, [navigation]); */

    const onSelectAttendance = (item) => {
        setClassName(item.className);
        if (!item.isSubmitted) {
            goTo('Subject');
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
            {!recentAttendanceList.length ? (
                <View style={styles.noDataContainer}>
                    {/* <Image source={backgroundImage} style={styles.image} /> */}
                    <Icon name="search" size={100} />
                    <Text style={TextStyle.large}>
                        You have not attended any class today!
                    </Text>
                    <Button
                        icon="telegram"
                        style={styles.attendanceBtn}
                        labelStyle={{color: Colors.white}}
                        onPress={() => goTo('Class')}
                    >
                        New Attendance
                    </Button>
                </View>
            ) : (
                /* <ImageBackground source={backgroundImage} style={styles.image}> */
                <FlatList
                    data={recentAttendanceList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.className.toString()}
                    style={styles.flatList}
                    // numColumns="2"
                />
                /* </ImageBackground> */
            )}
            <AttendanceFab onPress={() => goTo('Class')} />
        </View>
    );
};

export default withTheme(RecentAttendance);
