import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';

import App from './containers/App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Transactions from './components/Transactions.jsx';

ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/transactions" component={Transactions} />
    </Route>
  </Router>,
  document.getElementById('app')
);
