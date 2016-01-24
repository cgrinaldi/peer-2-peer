import React from 'react';
import {connect} from 'react-redux';
import {routeActions} from 'redux-simple-router';

export function requireAuthentication(Component) {
  var AuthenticatedComponent = React.createClass({
    componentWillMount () {
      this.checkAuth();
    },

    componentWillReceiveProps (nextProps) {
      this.checkAuth();
    },

    checkAuth () {
      if (!this.props.isAuthenticated) {
        var redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(routeActions.push('/login'));
      }
    },

    render () {
      return (
        <div>
          {this.props.isAuthenticated ? <Component {...this.props} /> : null}
        </div>
      );
    }
  });

  const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
      email: state.auth.email,
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(AuthenticatedComponent);
}
