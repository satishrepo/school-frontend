import * as type from './types';
import * as attendanceService from '../../services/attendance';

const fetchClasses = () => ({
    type: type.FETCH_CLASSES_REQUEST
});

const fetchClassesSuccess = (response) => ({
    type: type.FETCH_CLASSES_REQUEST_SUCCESS,
    response
});

const fetchClassesError = (error) => ({
    type: type.FETCH_CLASSES_REQUEST_ERROR,
    error
});

const selectedClass = (className) => ({
    type: type.SELECTED_CLASS,
    className
});

const fetchSubjects = () => ({
    type: type.FETCH_SUBJECTS_REQUEST
});

const fetchSubjectsSuccess = (response) => ({
    type: type.FETCH_SUBJECTS_REQUEST_SUCCESS,
    response
});

const fetchSubjectsError = (error) => ({
    type: type.FETCH_SUBJECTS_REQUEST_ERROR,
    error
});

const selectedSubject = (subjectName) => ({
    type: type.SELECTED_SUBJECT,
    subjectName
});

const attendanceDateTime = (dateTime) => ({
    type: type.ATTENDANCE_DATE_TIME,
    dateTime
});

const fetchStudents = () => ({
    type: type.FETCH_STUDENTS_REQUEST
});

const fetchStudentsSuccess = (response) => ({
    type: type.FETCH_STUDENTS_REQUEST_SUCCESS,
    response
});

const fetchStudentsError = (error) => ({
    type: type.FETCH_STUDENTS_REQUEST_ERROR,
    error
});

const selectedAttendance = (attendanceData) => ({
    type: type.SELECTED_ATTENDANCE,
    attendanceData
});

/* const submitAttendance = () => ({
    type: type.SUBMIT_ATTENDANCE_REQUEST
});

const submitAttendanceSuccess = (response) => ({
    type: type.SUBMIT_ATTENDANCE_REQUEST_SUCCESS,
    response
});

const submitAttendanceError = (error) => ({
    type: type.SUBMIT_ATTENDANCE_REQUEST_ERROR,
    error
}); */

const setRecentAttendances = (attendanceData) => ({
    type: type.SET_RECENT_ATTENDANCES,
    attendanceData
});

export const getClasses = () => {
    return (dispatch) => {
        dispatch(fetchClasses());
        attendanceService
            .getClasses()
            .then((response) => {
                dispatch(fetchClassesSuccess(response));
            })
            .catch((error) => {
                console.log('get classes error: ', error);
                dispatch(fetchClassesError(error));
            });
    };
};

export const setClassName = (className) => {
    return (dispatch) => {
        dispatch(selectedClass(className));
    };
};

export const getSubjects = () => {
    return (dispatch) => {
        dispatch(fetchSubjects());
        attendanceService
            .getSubjects()
            .then((response) => {
                dispatch(fetchSubjectsSuccess(response));
            })
            .catch((error) => {
                console.log('GET SUBJECT ERROR: ', error);
                dispatch(fetchSubjectsError(error));
            });
    };
};

export const setSubject = (subjectName) => {
    return (dispatch) => {
        dispatch(selectedSubject(subjectName));
    };
};

export const setAttendanceDateTime = (dateTime) => {
    return (dispatch) => {
        dispatch(attendanceDateTime(dateTime));
    };
};

export const getStudents = (className) => {
    return (dispatch) => {
        dispatch(fetchStudents());
        attendanceService
            .getStudents(className)
            .then((response) => {
                dispatch(
                    fetchStudentsSuccess({[className]: response.data.payload})
                );
            })
            .catch((error) => {
                console.log('GET STUDENTS ERROR: ', error);
                dispatch(fetchStudentsError(error));
            });
    };
};

export const setClassAttendance = (attendanceData) => {
    return (dispatch) => {
        dispatch(selectedAttendance(attendanceData));
    };
};

/* export const saveAttendance = (attendanceData) => {
    return (dispatch) => {
        dispatch(submitAttendance());
        attendanceService
            .submitAttendance(attendanceData)
            .then((response) => {
                dispatch(submitAttendanceSuccess(response.data.payload));
            })
            .catch((error) => {
                console.log('SUBMIT ATTENDANCE ERROR: ', error);
                dispatch(submitAttendanceError(error));
            });
    };
}; */

export const saveRecentAttendance = (attendanceData) => {
    return (dispatch) => {
        dispatch(setRecentAttendances(attendanceData));
    };
};
