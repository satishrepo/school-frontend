import { login } from '../../../services/login'
import * as loginAction from './actions'

export const login = (payload) => {
    return (dispatch) => {
        dispatch(loginAction.login())
        login(payload).then(response => {
            loginAction.loginSuccess(response)
        }).catch(error =>{
            loginAction.loginFailure(error)
        });
    }
}