import {store} from '../index.jsx';
import {requestAllUsers} from '../actions';

// TODO: Do not want the path hardcoded
var socket = io.connect('http://localhost:3000');

// Fire event when new user logs on
socket.on('newUser', (email) => {
  // TODO: This is inefficient because we are making a request to the server
  // to get the status of all users, when in reality we could just do that client side
  store.dispatch(requestAllUsers());
  console.log('user with email', email, 'just logged on the client');
});

// Fire an event when user leaves
socket.on('userLeft', (email) => {
  // TODO: See comment above.
  store.dispatch(requestAllUsers());
  console.log('user with email', email, 'just logged off');
});

export default socket;
