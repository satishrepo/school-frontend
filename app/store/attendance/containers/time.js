import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    getClasses,
    setClassName,
    setAttendanceDateTime,
    getStudents,
    setClassAttendance
} from '../actions';
import Time from '../../../features/attendance/time';

const mapStateToProps = (state) => {
    return {
        // fetchClasses: state.attendanceReducer.fetchClasses,
        // fetchClassesResponse: state.attendanceReducer.fetchClassesResponse,
        // fetchClassesError: state.attendanceReducer.fetchClassesError,
        // fetchStudents: state.attendanceReducer.fetchStudents,
        // fetchStudentsResponse: state.attendanceReducer.fetchStudentsResponse,
        // fetchStudentsError: state.attendanceReducer.fetchStudentsError,
        selectedClass: state.attendanceReducer.selectedClass,
        selectedSubject: state.attendanceReducer.selectedSubject,
        attendanceDateTime: state.attendanceReducer.attendanceDateTime,
        currentAttendance: state.attendanceReducer.currentAttendance
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getClasses,
            setClassName,
            setAttendanceDateTime,
            getStudents,
            setClassAttendance
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Time);
