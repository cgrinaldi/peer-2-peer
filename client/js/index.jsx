import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore.js';

import App from './containers/App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Transactions from './components/Transactions.jsx';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/transactions" component={Transactions} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
