import axios from 'axios';
import {routeActions} from 'redux-simple-router';
import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
        CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
        LOGOUT_USER_REQUEST, LOGOUT_USER,
        TRANSACTIONS_REQUEST_SUCCESS,
        USERS_REQUEST_SUCCESS} from '../constants';

import socket from '../helpers/realtime.js';

export function loginUser (email, password) {
  return (dispatch) => {
    dispatch(loginUserRequest());
    axios.post('/users/signin', {email, password})
      .then((resp) => {
        var data = resp.data;
        console.log('data is', data);
        dispatch(loginUserSuccess(email, data.token, data.users));
        dispatch(requestAllUsers());
        dispatch(getTransactions());
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
  // Inform other users that new user is online
  socket.emit('join', email);
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
        dispatch(getTransactions());
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
  console.log('new users are', users);
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
  socket.emit('join', email);
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
      dispatch(logoutUserRequest(email));
      console.log('successfully logged out', resp);
    })
    .catch((err) => console.log('error on server', err));
  }
};

export function logoutUserRequest (email) {
  socket.emit('leave', email);
  return {
    type: LOGOUT_USER_REQUEST
  };
}

// TODO: This should be in its own file
// ACTIONS RELATE TO TRANSACTIONS
export function getTransactions () {
  return (dispatch) => {
    axios.get('/transactions')
      .then((resp) => {
        console.log('resp from getTransactions is', resp);
        dispatch(getTransactionsSuccess(resp.data));
      });
  }
}

export function getTransactionsSuccess (transactions) {
  return {
    type: TRANSACTIONS_REQUEST_SUCCESS,
    payload: {transactions}
  };
};

// TOOD: For some reason, this is casuing many requests to go off...Has
// something to do with being in the UserCard loop
// export function sendMoney (from, to, amount) {
//   return (dispatch) => {
//     axios.post('/transactions/send', {from, to, amount})
//       .then((resp) => {
//         console.log('response HERE is', resp);
//       });
//   }
// }
