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
    currentAttendance: null,
    submitAttendance: false,
    submitAttendanceResponse: null,
    submitAttendanceError: null,
    recentAttendances: null,
    fetchSubjects: false,
    fetchSubjectsResponse: null,
    fetchSubjectsError: null,
    selectedSubject: null
};

export default function attendanceReducer(state = initState, action) {
    switch (action.type) {
        case types.FETCH_CLASSES_REQUEST:
            return {
                ...state,
                fetchClasses: true
            };
        case types.FETCH_CLASSES_REQUEST_SUCCESS:
            return {
                ...state,
                fetchClassesResponse: action.response,
                fetchClasses: false
            };
        case types.FETCH_CLASSES_REQUEST_ERROR:
            return {
                ...state,
                fetchClassesError: action.error,
                fetchClasses: false
            };
        case types.SELECTED_CLASS:
            return {
                ...state,
                selectedClass: action.className
            };
        case types.FETCH_SUBJECTS_REQUEST:
            return {
                ...state,
                fetchSubjects: true
            };
        case types.FETCH_SUBJECTS_REQUEST_SUCCESS:
            return {
                ...state,
                fetchSubjectsResponse: action.response,
                fetchSubjects: false
            };
        case types.FETCH_SUBJECTS_REQUEST_ERROR:
            return {
                ...state,
                fetchSubjectsError: action.error,
                fetchSubjects: false
            };
        case types.SELECTED_SUBJECT:
            return {
                ...state,
                selectedSubject: action.subjectName
            };
        case types.ATTENDANCE_DATE_TIME:
            return {
                ...state,
                attendanceDataTime: action.dateTime
            };
        case types.FETCH_STUDENTS_REQUEST:
            return {
                ...state,
                fetchStudents: true
            };
        case types.FETCH_STUDENTS_REQUEST_SUCCESS:
            return {
                ...state,
                fetchStudentsResponse: action.response,
                fetchStudents: false
            };
        case types.FETCH_STUDENTS_REQUEST_ERROR:
            return {
                ...state,
                fetchStudentsError: action.error,
                loginRequest: false
            };
        case types.SELECTED_ATTENDANCE:
            return {
                ...state,
                currentAttendance: action.attendanceData
            };
        case types.SUBMIT_ATTENDANCE_REQUEST:
            return {
                ...state,
                submitAttendance: true
            };
        case types.SUBMIT_ATTENDANCE_REQUEST_SUCCESS:
            return {
                ...state,
                submitAttendanceResponse: action.response,
                submitAttendance: false
            };
        case types.SUBMIT_ATTENDANCE_REQUEST_ERROR:
            return {
                ...state,
                submitAttendanceError: action.error,
                submitAttendance: false
            };
        case types.SET_RECENT_ATTENDANCES:
            return {
                ...state,
                recentAttendances: {
                    ...state.recentAttendances,
                    ...action.attendanceData
                }
            };
        default:
            return state;
    }
}
