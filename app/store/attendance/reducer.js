import * as types from './types';

const initState = {
    fetchClasses: false,
    fetchClassesResponse: null,
    fetchClassesError: null,
    selectedClass: null,
    attendanceDataTime: null,
    fetchStudents: false,
    fetchStudentsResponse: null,
    fetchStudentsError: null,
    currentAttendance: null
}


export default function attendanceReducer( state = initState, action) {
    switch(action.type) {
        case types.FETCH_CLASSES_REQUEST:
            return {
                ...state,
                fetchClasses: true
            }
        case types.FETCH_CLASSES_REQUEST_SUCCESS:
            return {
                ...state,
                fetchClassesResponse: action.response,
                fetchClasses: false
            }
        case types.FETCH_CLASSES_REQUEST_ERROR: 
            return {
                ...state,
                fetchClassesError: action.error,
                fetchClasses: false
            }
        case types.SELECTED_CLASS:
            return {
                ...state,
                selectedClass: action.className
            }
        case types.ATTENDANCE_DATE_TIME: 
            return {
                ...state,
                attendanceDataTime: action.dateTime
            }
        case types.FETCH_STUDENTS_REQUEST:
            return {
                ...state,
                fetchStudents: true
            }
        case types.FETCH_STUDENTS_REQUEST_SUCCESS: 
            return {
                ...state,
                fetchStudentsResponse: action.response,
                fetchStudents: false
            }
        case types.FETCH_STUDENTS_REQUEST_ERROR: 
            return {
                ...state,
                fetchStudentsError: action.error,
                loginRequest: false
            }
        case types.SELECTED_ATTENDANCE: 
            return {
                ...state,
                currentAttendance: action.attendanceData
            }
        default: 
            return state
    }

} 