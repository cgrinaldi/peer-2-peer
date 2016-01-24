import axios from 'axios';
import {routeActions} from 'redux-simple-router';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
        CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
        LOGOUT_USER_REQUEST, LOGOUT_USER,
        USERS_REQUEST_SUCCESS} from '../constants';

export function loginUser (email, password) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    axios.post('/users/signin', {email, password})
      .then((resp) => {
        var data = resp.data;
        console.log('data is', data);
        dispatch(loginUserSuccess(email, data.token));
        dispatch(requestAllUsers());
        dispatch(routeActions.push('/dashboard'));
      })
      // If user is unsuccessful in signing in, issue failure action
      .catch((err) => {
        console.log('err is', err);
        dispatch(loginUserFailure())
      });
  }
};

export function loginUserRequest () {
  return {
    type: LOGIN_USER_REQUEST
  }
};

export function loginUserSuccess(email, token, users) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {email, token, users}
  };
};

export function loginUserFailure() {
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      statusText: 'Invalid username or password'
    }
  };
};

export function createUser(email, password) {
  return (dispatch) => {
    dispatch(createUserRequest());
    axios.post('/users/signup', {email, password})
      .then((resp) => {
        var data = resp.data;
        console.log('data is', data);
        dispatch(createUserSuccess(email, data.token));
        dispatch(requestAllUsers());
        dispatch(routeActions.push('/dashboard'));
      })
      .catch(() => dispatch(createUserFailure()));
  }
}

export function requestAllUsers() {
  return (dispatch) => {
    axios.get('/users')
      .then((resp) => {
        console.log('resp from requestAllUsers is', resp);
        dispatch(requestAllUsersSuccess(resp.data));
      });
  }
}

export function requestAllUsersSuccess(users) {
  return {
    type: USERS_REQUEST_SUCCESS,
    payload: {users}
  };
};

export function createUserRequest() {
  return {
    type: CREATE_USER_REQUEST
  }
};

export function createUserSuccess(email, token, users) {
  localStorage.setItem('token', token);
  return {
    type: CREATE_USER_SUCCESS,
    payload: {email, token, users}
  };
};

export function createUserFailure() {
  return {
    type: CREATE_USER_FAILURE,
    payload: {
      statusText: 'Unable to create new account. Please try again later.'
    }
  };
}

export function logout (email) {
  return (dispatch) => {
    localStorage.removeItem('token');
    axios.post('/users/logout', {email})
    .then((resp) => {
      dispatch(logoutUserRequest());
      console.log('successfully logged out', resp);
    })
    .catch((err) => console.log('error on server', err));
  }
};

export function logoutUserRequest () {
  return {
    type: LOGOUT_USER_REQUEST
  };
}
