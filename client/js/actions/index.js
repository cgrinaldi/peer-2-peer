import axios from 'axios';
import {routeActions} from 'redux-simple-router';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS} from '../constants';

export function loginUser (email, password) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    axios.post('/users/signin', {email, password})
      .then((resp) => {
        var data = resp.data;
        dispatch(loginUserSuccess(data.token));
        dispatch(routeActions.push('/dashboard'));
      });
  }
};

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
};

export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  }
}
