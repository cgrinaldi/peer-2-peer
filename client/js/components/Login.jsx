import React from 'react';
import '../../styles/Login.scss';

export default React.createClass({
  render () {
    return (
      <div className="col-xs-12 col-md-4 col-md-offset-4">
        <h3 className="text-center">Please Login</h3>
        {this.props.statusText ? <div className="alert alert-info">{this.props.statusText}</div> : ''}
        <form role="form">
        <div className="form-group">
            <input type="text"
              className="form-control input-lg"
              placeholder="Email" />
            </div>
          <div className="form-group">
            <input type="password"
              className="form-control input-lg"
              placeholder="Password" />
          </div>
          <div className="row">
            <button type="submit"
              className="btn btn-lg btn-primary push-right"
              >
              Login
            </button>
            <a>Do not have an account? <strong>Sign up</strong></a>
          </div>
      </form>
    </div>
    );
  }
});
