import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin } from './actions'
import Login from '../../features/login'

const mapStateToProps = state => {
    return {
        loginRequest: state.loginReducer.loginRequest,
        loginResponse: state.loginReducer.loginResponse,
        loginError: state.loginReducer.loginError,
        loggedUser: state.loginReducer.loggedUser,
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        userLogin
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)