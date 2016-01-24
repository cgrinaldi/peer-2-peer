import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';

import Users from '../components/Users.jsx';

const Dashboard = React.createClass({
  render () {
    return (
      <Users
        users={this.props.users}
        email={this.props.email} />
    );
  }
});

const mapStateToProps = (state) => {
  return {
    users: state.users,
    email: state.auth.email
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
