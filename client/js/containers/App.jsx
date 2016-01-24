import React from 'react';

import Navigation from '../containers/Navigation.jsx';
import Login from '../components/Login.jsx';

const App = React.createClass({
  render () {
    return (
      <div>
        <Navigation />
        <div className="container">
          {this.getContent()}
        </div>
      </div>
    );
  },

  getContent () {
    return this.props.children || <Login />
  }
});

export default App;
