import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actionCreators from '../actions';
import '../../styles/Login.scss';

const Login = React.createClass({
  getInitialState () {
    return {
      email: '',
      password: ''
    };
  },

  handleChange(property, e) {
    this.setState({
      [property]: e.target.value
    });
  },

  loginUser(e) {
    e.preventDefault();
    this.props.actions.loginUser(this.state.email, this.state.password);
    this.setState({
      email: '',
      password: ''
    });
  },

  render () {
    return (
      <div className="col-xs-12 col-md-4 col-md-offset-4">
        <h3 className="text-center">Login</h3>
        {this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : ''}
        <form role="form">
          <div className="form-group">
            <input type="text"
              className="form-control input-lg"
              value={this.state.email}
              onChange={this.handleChange.bind(null, 'email')}
              placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="password"
              value={this.state.password}
              onChange={this.handleChange.bind(null, 'password')}
              className="form-control input-lg"
              placeholder="Password" />
          </div>
          <div className="row">
            <button type="submit"
              className="btn btn-lg btn-primary push-right"
              onClick={this.loginUser}
              >
              Login
            </button>
            <Link to="signup">Do not have an account? <strong>Sign up</strong></Link>
          </div>
        </form>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
