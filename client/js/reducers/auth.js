import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS,
        CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
        LOGOUT_USER} from '../constants';

const initialState = {
  token: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default function auth (state = initialState, action) {
  const payload = action.payload;
  switch(action.type) {
  case LOGIN_USER_REQUEST:
    return {
      isAuthenticating: true,
      statusText: null
    };

  case LOGIN_USER_SUCCESS:
    return {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      email: payload.email
    };

  case LOGIN_USER_FAILURE:
    return {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      email: null,
      statusText: payload.statusText
    };

  case CREATE_USER_REQUEST:
    return {
      isAuthenticating: true,
      statusText: null
    };

  case CREATE_USER_SUCCESS:
    return {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      email: payload.email
    };

  case CREATE_USER_FAILURE:
    return {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      email: null,
      statusText: payload.statusText
    };

  case LOGOUT_USER:
    return {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      email: null
    };

  default:
    return state;
  }
}
