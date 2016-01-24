import {USERS_REQUEST_SUCCESS} from '../constants';

export default function users(state = [], action) {
  const payload = action.payload;
  switch (action.type) {
    case USERS_REQUEST_SUCCESS:
      return payload.users;

    default:
      return state;
  }
}
