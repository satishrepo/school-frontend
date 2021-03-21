import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSubjects, setSubject} from '../actions';
import Subject from '../../../features/attendance/subject';

const mapStateToProps = (state) => {
    return {
        fetchSubjects: state.attendanceReducer.fetchSubjects,
        fetchSubjectsResponse: state.attendanceReducer.fetchSubjectsResponse,
        fetchSubjectsError: state.attendanceReducer.fetchSubjectsError,
        selectedSubject: state.attendanceReducer.selectedSubject
    };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getSubjects,
            setSubject
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
