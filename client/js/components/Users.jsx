import React from 'react';

import UserCard from './UserCard.jsx';

export default React.createClass({
  // Only render others users (not current user)
  renderUsers () {
    return this.props.users.filter((user) => {
      return user.email !== this.props.email;
    }).map((user) => {
      return <UserCard key={user.email} user={user} />
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
