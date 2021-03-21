import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

import {withTheme, Avatar, Chip, IconButton, Colors} from 'react-native-paper';

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
        padding: 5,
        borderRadius: 5,
        margin: 5,
        backgroundColor: 'white'
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
    }
});

const ListItem = (props) => {
    const {theme, item, onPress, showReason, disabled} = props;

    const attendanceBackground = item.isPresent
        ? theme.colors.green
        : theme.colors.red;

    const homeWorkBackground = item.isHomework
        ? theme.colors.green
        : theme.colors.red;

    const showModal = (type) => {
        onPress(item, item.index, type);
    };

    return (
        <Pressable
            disabled={disabled}
            style={[styles.userList]}
            onPress={() => showModal('ATTENDANCE')}
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
                    <Text>
                        <Chip
                            disabled={disabled}
                            icon={item.isPresent ? 'check' : 'cancel'}
                            style={{backgroundColor: attendanceBackground}}
                            onPress={() => showModal('ATTENDANCE')}
                        >
                            {item.isPresent ? 'Present' : 'Absent'}
                        </Chip>

                        {!item.isPresent && item.absentReason ? (
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
                        )}
                    </Text>
                    <Text>
                        <Chip
                            disabled={disabled}
                            icon={item.isHomework ? 'check' : 'cancel'}
                            style={{backgroundColor: homeWorkBackground}}
                            onPress={() => showModal('HOMEWORK')}
                        >
                            {item.isHomework ? 'Done' : 'Not Done'}
                        </Chip>

                        {!item.isHomework && item.homeworkReason ? (
                            <IconButton
                                icon="eye"
                                color={Colors.red500}
                                size={20}
                                onPress={(e) => showReason(e, item, 'HOMEWORK')}
                            />
                        ) : (
                            ''
                        )}
                    </Text>
                </View>
            </View>
        </Pressable>

        // <Card
        //     style={[styles.card, {backgroundColor}]}
        //     onPress={onPress} >
        //     <Card.Cover
        //         source={{ uri: 'https://picsum.photos/700' }}
        //         resizeMode={`cover`}
        //         style={{flexDirection: 'column', height: '70%'}}/>
        //     <Card.Content>
        //         <Title>#{item.rollNo}</Title>
        //         <Paragraph>{item.name.toUpperCase()}</Paragraph>
        //     </Card.Content>

        /* <Card.Actions> */
        /* <Button>Cancel</Button>
                    <Button>Ok</Button> */
        /* <Button>Reason</Button> */
        /* </Card.Actions> */
        // </Card>
    );
};

export default withTheme(ListItem);
