import {TRANSACTIONS_REQUEST_SUCCESS} from '../constants';

export default function users(state = [], action) {
  const payload = action.payload;
  switch (action.type) {
    case TRANSACTIONS_REQUEST_SUCCESS:
      return payload.transactions;

    default:
      return state;
  }
}
