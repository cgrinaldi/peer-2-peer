import React from 'react';

export default React.createClass({
  renderUsers () {
    return this.props.users.map((user) => {
      return <li key={user.email}>{user.email} is {user.isOnline ? 'online': 'offline'}</li>
    });
  },

  render () {
    return (
      <ul>
        {this.renderUsers()}
      </ul>
    )
  }
})
