import {LOGIN_USER_REQUEST} from '../constants';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};

export default function auth (state = initialState, action) {
  switch(action.type) {
  case LOGIN_USER_REQUEST:
    return {
      isAuthenticating: true,
      statusText: null
    };

  default:
    return state;
  }
}
