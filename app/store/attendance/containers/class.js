import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    getClasses,
    setClassName,
    setAttendanceDateTime,
    getStudents,
    setClassAttendance
} from '../actions'
import Class from '../../../features/attendance/class'

const mapStateToProps = state => {
    return {
        fetchClasses: state.attendanceReducer.fetchClasses,
        fetchClassesResponse: state.attendanceReducer.fetchClassesResponse,
        fetchClassesError: state.attendanceReducer.fetchClassesError,
        selectedClass: state.attendanceReducer.selectedClass,
        attendanceDateTime: state.attendanceReducer.attendanceDateTime,
        fetchStudents: state.attendanceReducer.fetchStudents,
        fetchStudentsResponse: state.attendanceReducer.fetchStudentsResponse,
        fetchStudentsError: state.attendanceReducer.fetchStudentsError,
        currentAttendance: state.attendanceReducer.currentAttendance
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getClasses,
        setClassName,
        setAttendanceDateTime,
        getStudents,
        setClassAttendance
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Class)