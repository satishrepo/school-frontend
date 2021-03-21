import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {getSubjects, setSubject} from '../../attendance/actions';
import RecentAttendance from '../../../features/attendance/recent';

const mapStateToProps = (state) => {
    return {
        recentAttendances: state.attendanceReducer.recentAttendances
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getSubjects,
            // setSubject
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(RecentAttendance);
