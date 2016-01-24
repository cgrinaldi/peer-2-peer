import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

export default React.createClass({
  render () {
    const {email, isOnline} = this.props.user;
    const userStatus = isOnline ? "Online" : "Offline";
    const cardStyle = {
      width: '250px',
      marginRight: '10px',
      marginBottom: '10px',
      float: 'left'
    };
    return (
      <Card style={cardStyle}>
        <CardTitle
          title={email}
          subtitle={userStatus} />
        <CardActions>
          <FlatButton label="Transfer" />
          <FlatButton label="Request" />
        </CardActions>
      </Card>
    );
  }
});
