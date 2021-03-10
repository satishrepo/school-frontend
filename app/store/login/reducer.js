import * as types from './types';

const initState = {
    loginRequest: false,
    loginResponse: null,
    loginError: null,
    loggedUser: null
}


export default function loginReducer( state = initState, action) {
    switch(action.type) {
        case types.USER_LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true
            }
        case types.USER_LOGIN_REQUEST_SUCCESS: 
            return {
                ...state,
                loginResponse: action.response,
                loggedUser: action.response.payload,
                loginRequest: false
            }
        case types.USER_LOGIN_REQUEST_FAILURE: 
            return {
                ...state,
                loginError: action.error,
                loginRequest: false
            }
        default: 
            return state
    }

} 