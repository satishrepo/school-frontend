import { combineReducers } from 'redux'
import loginReducer from './login/reducer'
import attendanceReducer from './attendance/reducer'

const mainReducer = combineReducers({
    loginReducer,
    attendanceReducer
})

const rootReducer = (state, action) => {
    return mainReducer(state, action)
}

export default rootReducer