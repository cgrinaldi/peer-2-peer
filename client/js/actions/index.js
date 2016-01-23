import {LOGIN_USER_REQUEST} from '../constants';

export function loginUser (email, password) {
  return {
    type: LOGIN_USER_REQUEST,
    payload: {email, password}
  };
}
