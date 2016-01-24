import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';
import {requireAuthentication} from './components/AuthenticatedComponent.jsx';

import App from './containers/App.jsx';
import Dashboard from './containers/Dashboard.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Transactions from './components/Transactions.jsx';

import configureSocket from './helpers/realtime.js';

const store = configureStore();

// Setting up real-time conection with server over websockets
// TODO: Do not want the path hardcoded
var socket = io.connect('http://localhost:3000');
configureSocket(socket);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={requireAuthentication(Dashboard)} />
        <Route path="/transactions" component={requireAuthentication(Transactions)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
