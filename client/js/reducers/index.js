import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import auth from './auth.js';

const rootReducer = combineReducers({
  auth,
  routing: routeReducer
});

export default rootReducer;
