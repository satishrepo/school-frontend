import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getClasses,
    setClassName,
    setAttendanceDateTime,
    getStudents,
    setClassAttendance,
    saveAttendance,
    saveRecentAttendance
} from '../actions';
import Presence from '../../../features/attendance/presence';

const mapStateToProps = (state) => {
    return {
        // fetchClasses: state.attendanceReducer.fetchClasses,
        // fetchClassesResponse: state.attendanceReducer.fetchClassesResponse,
        // fetchClassesError: state.attendanceReducer.fetchClassesError,
        selectedClass: state.attendanceReducer.selectedClass,
        attendanceDateTime: state.attendanceReducer.attendanceDateTime,
        fetchStudents: state.attendanceReducer.fetchStudents,
        fetchStudentsResponse: state.attendanceReducer.fetchStudentsResponse,
        fetchStudentsError: state.attendanceReducer.fetchStudentsError,
        currentAttendance: state.attendanceReducer.currentAttendance,
        submitAttendance: state.attendanceReducer.submitAttendance,
        submitAttendanceResponse:
            state.attendanceReducer.submitAttendanceResponse,
        submitAttendanceError: state.attendanceReducer.submitAttendanceError,
        recentAttendances: state.attendanceReducer.recentAttendances,
        selectedSubject: state.attendanceReducer.selectedSubject
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getClasses,
            setClassName,
            setAttendanceDateTime,
            getStudents,
            setClassAttendance,
            saveAttendance,
            saveRecentAttendance
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Presence);
