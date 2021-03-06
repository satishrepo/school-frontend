import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native';
import {withTheme} from 'react-native-paper';
import ReasonModal from './reasonModal';
import DialogBox from '../../../components/dialog';
import ListItem from './listItem';
import {toTitleCase} from '../../../libs/helper';

const CONFIRM_ATTENDANCE = {
    title: 'Are you sure ?',
    content:
        'This will permanently save attendance data, are you sure you want to do this ?'
};

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

const Attendance = (props) => {
    const {
        getStudents,
        fetchStudentsResponse,
        submitAttendanceResponse,
        selectedClass,
        attendanceDate,
        saveAttendance,
        setClassAttendance,
        saveRecentAttendance,
        fetchStudents,
        recentAttendances
    } = props;

    const initReasonData = {
        type: '',
        title: '',
        reasons: []
    };
    const {theme, navigation} = props;
    const [studentData, setStudentData] = useState([]);
    const [readOnly, setReadOnly] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [viewReason, setViewReason] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [reasonModalData, setReasonModalData] = useState(initReasonData);

    useEffect(() => {
        console.log(props);

        if (
            (!fetchStudentsResponse || !fetchStudentsResponse[selectedClass]) &&
            (!recentAttendances || !recentAttendances[selectedClass])
        ) {
            getStudents(selectedClass);
        }

        // if attendanceId present in current attendance
        // then make page readOnly
        if (
            recentAttendances &&
            recentAttendances[selectedClass] &&
            recentAttendances[selectedClass].attendanceId
        ) {
            setReadOnly(true);
        }
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{marginRight: 20}}>
                    <Button
                        onPress={() => setShowConfirm(true)}
                        title={readOnly ? 'SUBMITTED' : 'SUBMIT'}
                        disabled={
                            fetchStudents || !studentData.length || readOnly
                        }
                    />
                </TouchableOpacity>
            )
        });
    }, [navigation, props, studentData, readOnly, setShowConfirm]);

    useEffect(() => {
        if (recentAttendances && recentAttendances[selectedClass]) {
            setStudentData(recentAttendances[selectedClass].attendanceData);
        } else if (fetchStudentsResponse) {
            const data = fetchStudentsResponse[selectedClass]
                ? fetchStudentsResponse[selectedClass].map((item) => {
                      return {
                          ...item,
                          isPresent: item.isPresent || true,
                          isHomework: item.isHomework || true
                      };
                  })
                : [];

            setStudentData(data);
        }
    }, [fetchStudentsResponse]);

    useEffect(() => {
        // save response of submitted attendance object
        if (submitAttendanceResponse) {
            setClassAttendance({
                [selectedClass]: submitAttendanceResponse
            });
            saveRecentAttendance({
                [submitAttendanceResponse.className]: submitAttendanceResponse
            });
        }
    }, [submitAttendanceResponse]);

    const markAttendance = (item, index) => {
        const modalData = {
            type: 'ATTENDANCE',
            title: 'Absent Reason',
            reasons: ['Sick', 'Leave', 'Medical', 'Unknown', 'Test', 'Abcd']
        };
        setReasonModalData(modalData);

        item.isPresent = !item.isPresent;
        item.index = index;
        setCurrentStudent(item);

        const sData = [...studentData];
        setStudentData(sData);
    };

    const markHomeWork = (item, index) => {
        const modalData = {
            type: 'HOMEWORK',
            title: 'Reason',
            reasons: ['Sick', 'Function', 'Out of town', 'Unknown']
        };
        setReasonModalData(modalData);

        item.isHomework = !item.isHomework;
        item.index = index;
        setCurrentStudent(item);

        const sData = [...studentData];
        setStudentData(sData);
    };

    const showReaonModal = (item, index, type) => {
        switch (type) {
            case 'ATTENDANCE':
                markAttendance(item, index);
                break;
            case 'HOMEWORK':
                markHomeWork(item, index);
                break;
            default:
                markAttendance(item, index);
        }
    };

    const showReason = (e, item, type) => {
        e.preventDefault();

        let modalData = {};

        if (type === 'ATTENDANCE') {
            modalData = {
                type,
                title: 'Absent Reason',
                reasons: ['Sick', 'Leave', 'Medical', 'Unknown', 'Test', 'Abcd']
            };
        } else if (type === 'HOMEWORK') {
            modalData = {
                type,
                title: 'Reason',
                reasons: ['Sick', 'Leave', 'Out of town', 'Unknown']
            };
        }

        setReasonModalData(modalData);

        setViewReason(true);
        setCurrentStudent(item);
        const sData = [...studentData];
        setStudentData(sData);
    };

    const renderItem = ({item, index}) => {
        const backgroundColor = item.isPresent
            ? theme.colors.green
            : theme.colors.red;
        item.index = index;
        return (
            <ListItem
                item={item}
                onPress={showReaonModal}
                backgroundColor={backgroundColor}
                showReason={showReason}
                disabled={readOnly}
            />
        );
    };

    const countAbsent = () => {
        const total = studentData.filter((item) => !item.isPresent);
        return total.length;
    };

    const submitAttendance = () => {
        const data = {
            className: selectedClass,
            attendanceDate: attendanceDate || new Date().toISOString(),
            attendanceData: studentData
        };
        saveAttendance(data);
    };

    const replyConfirm = (result) => {
        if (result) {
            submitAttendance();
        }
        setShowConfirm(false);
    };

    const onUpdateCallback = (updatedObject) => {
        setCurrentStudent(null);
        setViewReason(false);
        const sData = [...studentData];
        sData[updatedObject.index] = updatedObject.item;
        setStudentData(sData);
        setClassAttendance({
            [selectedClass]: {
                attendanceData: sData
            }
        });
        saveRecentAttendance({
            [selectedClass]: {
                attendanceData: sData
            }
        });
    };

    const onCancelCallback = (indexObj, type) => {
        setCurrentStudent(null);
        setViewReason(false);
        const sData = [...studentData];

        if (type === 'ATTENDANCE') {
            sData[indexObj.index].isPresent = indexObj.viewReason
                ? sData[indexObj.index].isPresent
                : !sData[indexObj.index].isPresent;

            if (!indexObj.viewReason) {
                delete sData[indexObj.index].absentReason;
            }
        } else if (type === 'HOMEWORK') {
            sData[indexObj.index].isHomework = indexObj.viewReason
                ? sData[indexObj.index].isHomework
                : !sData[indexObj.index].isHomework;

            if (!indexObj.viewReason) {
                delete sData[indexObj.index].homeworkReason;
            }
        }
        setStudentData(sData);
    };

    return (
        <View>
            <View style={styles.countBarCont}>
                <Text
                    style={[
                        styles.countBar,
                        {color: theme.colors.darkBlue},
                        {backgroundColor: theme.colors.primary}
                    ]}
                >
                    {toTitleCase(selectedClass)}
                </Text>
                <Text
                    style={[
                        styles.countBar,
                        {color: theme.colors.darkGreen},
                        {backgroundColor: theme.colors.green}
                    ]}
                >
                    Total Students : {studentData.length}{' '}
                </Text>
                <Text
                    style={[
                        styles.countBar,
                        {color: theme.colors.darkRed},
                        {backgroundColor: theme.colors.red}
                    ]}
                >
                    Absent Students : {countAbsent()}
                </Text>
            </View>
            {studentData.length ? (
                <ScrollView style={styles.userListCont}>
                    <FlatList
                        style={styles.flatList}
                        data={studentData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.rollNo.toString()}
                        // numColumns="2"
                    />
                </ScrollView>
            ) : (
                [
                    fetchStudents ? (
                        <ActivityIndicator size="large" />
                    ) : (
                        <Text key="no-student">Could not load students</Text>
                    )
                ]
            )}

            {currentStudent ? (
                <ReasonModal
                    modalData={reasonModalData}
                    onCancel={onCancelCallback}
                    readOnly={readOnly}
                    item={currentStudent}
                    onUpdate={onUpdateCallback}
                    viewReason={viewReason}
                />
            ) : (
                <Text />
            )}

            <DialogBox
                data={CONFIRM_ATTENDANCE}
                showConfirm={showConfirm}
                reply={replyConfirm}
            />
        </View>
    );
};

export default withTheme(Attendance);
