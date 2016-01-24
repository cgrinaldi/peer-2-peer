import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import auth from './auth.js';
import users from './users.js';

const rootReducer = combineReducers({
  auth,
  users,
  routing: routeReducer
});

export default rootReducer;
