import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import {
    withTheme,
    Avatar,
    Chip,
    IconButton,
    Colors,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {toTitleCase} from '../../../libs/helper';

const styles = StyleSheet.create({
    userListCont: {
        // display: 'flex',
    },
    flatList: {
        paddingBottom: 50
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
        justifyContent: 'space-around'
    },
    countBar: {
        backgroundColor: 'white',
        width: '30%',
        textAlign: 'center',
        padding: 5,
        margin: 2,
        borderRadius: 5,
        fontWeight: '500'
    },
    userList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 5,
        margin: 5,
        borderRadius: 5
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
    },
    actionArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingVertical: 2,
        paddingBottom: 2,
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        marginTop: -8,
        marginBottom: 5,
        marginHorizontal: 5,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopColor: Colors.grey100,
        borderTopWidth: 2
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    actionText: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15
    },
    actionsCont: {
        // marginHorizontal: 15,
    },
    indicIcon: {
        paddingVertical: 2,
        paddingHorizontal: 10
    }
});

const ListItem = (props) => {
    const {theme, item, onPress, showReason, disabled} = props;

    const [showActions, setShowActions] = useState(false);

    const attendanceBackground = item.isPresent
        ? theme.colors.green
        : theme.colors.red;

    const homeWorkBackground = item.isHomework
        ? theme.colors.green
        : theme.colors.red;

    const showModal = (type) => {
        console.log('type', type);
        onPress(item, item.index, type);
    };

    return (
        <View>
            <Pressable
                disabled={disabled}
                style={[styles.userList]}
                // onPress={() => showModal('ATTENDANCE')}
                onPress={() => setShowActions(!showActions)}
            >
                <Avatar.Image
                    size={60}
                    style={[styles.avatar]}
                    source={{uri: 'https://picsum.photos/200'}}
                />
                <View>
                    <Text style={styles.name}>{toTitleCase(item.name)} </Text>
                    <View style={styles.chipCont}>
                        <Text style={styles.rollNo}>#{item.rollNo}</Text>
                        <Icon
                            name="users"
                            size={20}
                            style={[
                                styles.indicIcon,
                                {
                                    color: item.isPresent
                                        ? Colors.green500
                                        : Colors.red500
                                }
                            ]}
                        />
                        {/* <Text> */}
                        {/* <Chip
                                disabled={disabled}
                                icon={item.isPresent ? 'check' : 'cancel'}
                                style={{backgroundColor: attendanceBackground}}
                                onPress={() => showModal('ATTENDANCE')}
                            >
                                {item.isPresent ? 'Present' : 'Absent'}
                            </Chip> */}

                        {/* {!item.isPresent && item.absentReason ? (
                                <IconButton
                                    icon="eye"
                                    color={Colors.red500}
                                    size={20}
                                    onPress={(e) =>
                                        showReason(e, item, 'ATTENDANCE')
                                    }
                                />
                            ) : (
                                ''
                            )} */}
                        {/* <Switch
                                disabled={disabled}
                                value={item.isPresent}
                                onValueChange={() => showModal('ATTENDANCE')}
                            /> */}
                        {/* </Text> */}
                        <Icon
                            name="file-text-o"
                            size={20}
                            style={[
                                styles.indicIcon,
                                {
                                    color: item.isHomework
                                        ? Colors.green500
                                        : Colors.red500
                                }
                            ]}
                        />
                        {/* <Text> */}
                            {/* <Chip
                                disabled={disabled}
                                icon={item.isHomework ? 'check' : 'cancel'}
                                style={{backgroundColor: homeWorkBackground}}
                                onPress={() => showModal('HOMEWORK')}
                            >
                                {item.isHomework ? 'Done' : 'Not Done'}
                            </Chip> */}

                            {/* {!item.isHomework && item.homeworkReason ? (
                                <IconButton
                                    icon="eye"
                                    color={Colors.red500}
                                    size={20}
                                    onPress={(e) =>
                                        showReason(e, item, 'HOMEWORK')
                                    }
                                />
                            ) : (
                                ''
                            )} */}

                            {/* <Switch
                                disabled={disabled}
                                value={item.isHomework}
                                onValueChange={() => showModal('HOMEWORK')}
                            /> */}
                        {/* </Text> */}
                    </View>
                </View>
            </Pressable>
            {showActions ? (
                <View style={styles.actionArea}>
                    <View style={styles.actionsCont}>
                        <View style={styles.flexRow}>
                            {item.isPresent ? (
                                <IconButton
                                    icon="check"
                                    color={Colors.green500}
                                    size={25}
                                    onPress={() => showModal('ATTENDANCE')}
                                />
                            ) : (
                                <>
                                    <IconButton
                                        icon="cancel"
                                        color={Colors.red500}
                                        size={25}
                                        onPress={() => showModal('ATTENDANCE')}
                                    />
                                    <IconButton
                                        icon="eye"
                                        color={Colors.red500}
                                        size={25}
                                        onPress={(e) =>
                                            showReason(e, item, 'ATTENDANCE')
                                        }
                                    />
                                </>
                            )}
                        </View>
                        <Text style={styles.actionText}>Attendance</Text>
                    </View>
                    <View style={styles.actionsCont}>
                        <View style={styles.flexRow}>
                            {item.isHomework ? (
                                <IconButton
                                    icon="check"
                                    color={Colors.green500}
                                    size={25}
                                    onPress={() => showModal('HOMEWORK')}
                                />
                            ) : (
                                <>
                                    <IconButton
                                        icon="cancel"
                                        color={Colors.red500}
                                        size={25}
                                        onPress={() => showModal('HOMEWORK')}
                                    />
                                    <IconButton
                                        icon="eye"
                                        color={Colors.red500}
                                        size={25}
                                        onPress={(e) =>
                                            showReason(e, item, 'HOMEWORK')
                                        }
                                    />
                                </>
                            )}
                        </View>
                        <Text style={styles.actionText}>Homework</Text>
                    </View>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

export default withTheme(ListItem);
