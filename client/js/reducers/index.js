import {combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';
import auth from './auth.js';
import users from './users.js';
import transactions from './transactions.js';

const rootReducer = combineReducers({
  auth,
  users,
  transactions,
  routing: routeReducer
});

export default rootReducer;
