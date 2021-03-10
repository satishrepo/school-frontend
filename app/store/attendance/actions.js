import * as type  from './types';
import * as attendanceService from '../../services/attendance'


const fetchClasses = () => ({
    type: type.FETCH_CLASSES_REQUEST
})

const fetchClassesSuccess = (response) => ({
    type: type.FETCH_CLASSES_REQUEST_SUCCESS,
    response
})

const fetchClassesError = (error) => ({
    type: type.FETCH_CLASSES_REQUEST_ERROR,
    error
})


const selectedClass = className => ({
    type: type.SELECTED_CLASS,
    className
})

const attendanceDateTime = dateTime => ({
    type: type.ATTENDANCE_DATE_TIME,
    dateTime
})

const fetchStudents = () => ({
    type: type.FETCH_STUDENTS_REQUEST,
})

const fetchStudentsSuccess = (response) => ({
    type: type.FETCH_STUDENTS_REQUEST_SUCCESS,
    response
})

const fetchStudentsError = (error) => ({
    type: type.FETCH_STUDENTS_REQUEST_ERROR,
    error
})

const selectedAttendance = attendanceData => ({
    type: type.SELECTED_ATTENDANCE,
    attendanceData
})

const submitAttendance = () => ({
    type: type.SUBMIT_ATTENDANCE_REQUEST,
})

const submitAttendanceSuccess = (response) => ({
    type: type.SUBMIT_ATTENDANCE_REQUEST_SUCCESS,
    response
})

const submitAttendanceError = (error) => ({
    type: type.SUBMIT_ATTENDANCE_REQUEST_ERROR,
    error
})

export const getClasses = () => {
    return dispatch => {
        dispatch(fetchClasses())
        attendanceService.getClasses().then(response => {
            dispatch(fetchClassesSuccess(response))
        }).catch(error =>{
            console.log('get classes error: ', error)
            dispatch(fetchClassesError(error.response.data))
        });
    }
}

export const setClassName = (className) => {
    return dispatch => {
        dispatch(selectedClass(className))
    }
}

export const setAttendanceDateTime = (dateTime) => {
    return dispatch => {
        dispatch(attendanceDateTime(dateTime))
    }
}

export const getStudents = (className) => {
    return dispatch => {
        dispatch(fetchStudents())
        attendanceService.getStudents(className).then(response => {
            dispatch(fetchStudentsSuccess({[className] : response.data.payload}))
        }).catch(error =>{
            console.log('GET STUDENTS ERROR: ', error)
            dispatch(fetchStudentsError(error.response.data))
        });
    }
}

export const setClassAttendance = (attendanceData) => {
    return dispatch => {
        dispatch(selectedAttendance(attendanceData))
    }
}

export const saveAttendance = (attendanceData) => {
    return dispatch => {
        dispatch(submitAttendance())
        attendanceService.submitAttendance(attendanceData).then(response => {
            dispatch(submitAttendanceSuccess(response))
        }).catch(error =>{
            console.log('SUBMIT ATTENDANCE ERROR: ', error)
            dispatch(submitAttendanceError(error.response.data))
        });
    }
}