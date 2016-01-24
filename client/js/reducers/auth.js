import {LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS} from '../constants';

const initialState = {
  token: null,
  userName: null,
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

  default:
    return state;
  }
}
