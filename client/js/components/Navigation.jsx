import React from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';

const Navigation = React.createClass({
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link activeClassName="active" to="dashboard">Dashboard</Link></li>
              <li><Link activeClassName="active" to="transactions">Transactions</Link></li>
              {this.props.isAuthenticated ?
                <li><Link onClick={() => this.props.actions.logout()} to="login">Log Out</Link></li> :
                <li><Link to="login">Login</Link></li>
              }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
