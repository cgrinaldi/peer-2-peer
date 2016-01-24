import axios from 'axios';
import {routeActions} from 'redux-simple-router';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE} from '../constants';

export function loginUser (email, password) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    axios.post('/users/signin', {email, password})
      .then((resp) => {
        var data = resp.data;
        console.log('data is', data);
        dispatch(loginUserSuccess(email, data.token));
        dispatch(routeActions.push('/dashboard'));
      })
      // If user is unsuccessful in signing in, issue failure action
      .catch(() => dispatch(loginUserFailure()));
  }
};

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
};

export function loginUserSuccess(email, token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {email, token}
  };
}

export function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      statusText: 'Invalid username or password'
    }
  };
}
