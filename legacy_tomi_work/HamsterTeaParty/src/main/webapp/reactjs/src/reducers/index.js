import counterReducer from './counter';
import loggedReducer from './isLogged';
import userTokenReducer from './userToken';
import userIdentityReducer from './userIdentity';
import  { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    loggedIn: loggedReducer,
    userIdentity: userIdentityReducer,
    userToken: userTokenReducer
})

export default allReducers;