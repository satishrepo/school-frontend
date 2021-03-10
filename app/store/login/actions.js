import * as type  from './types';
import * as loginService from '../../services/login'

const login = () => ({
    type: type.USER_LOGIN_REQUEST
})

const loginSuccess = (response) => ({
    type: type.USER_LOGIN_REQUEST_SUCCESS,
    response
})

const loginFailure = (error) => ({
    type: type.USER_LOGIN_REQUEST_FAILURE,
    error
})



export const userLogin = (payload) => {
    return dispatch => {
        dispatch(login())
        loginService.login(payload).then(response => {
            dispatch(loginSuccess(response.data))
        }).catch(error =>{
            console.log('error in login: ', error)
            dispatch(loginFailure(error.response.data))
        });
    }
}
