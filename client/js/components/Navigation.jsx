import React from 'react';
import {Link} from 'react-router';

export default React.createClass({
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link activeClassName="active" to="dashboard">Dashboard</Link></li>
              <li><Link activeClassName="active" to="transactions">Transactions</Link></li>
              <li><a>Log Out</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
