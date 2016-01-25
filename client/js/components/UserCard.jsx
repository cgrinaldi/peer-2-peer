import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Popover from 'material-ui/lib/popover/popover';
import TextField from 'material-ui/lib/text-field';

export default React.createClass({
  getInitialState () {
    return {
      activePopover: 'none',
      anchorEl: null,
      amount: '',
      errorText: '',
      message: ''
    };
  },

  show (key, e) {
    this.setState({
      activePopover: key,
      anchorEl: e.currentTarget
    })
  },

  closePopover (key) {
    if (this.state.activePopover !== key) {
      return;
    }
    this.setState({
      activePopover: 'none'
    });
  },

  handleAmountChange (e) {
    if (e.target.value > 50) {
      this.setState({
        errorText: 'Not enough in your account!'
      });
    } else {
      this.setState({errorText:''});
    }

    this.setState({
      amount: e.target.value
    });
  },

  handleMessageChange (e) {
    this.setState({
      message: e.target.value
    });
  },

  renderErrorText () {
    return (
      <h5 style={{color: 'red'}}>{this.state.errorText}</h5>
    );
  },

  render () {
    const {email, isOnline, balance} = this.props.user;
    const userStatus = isOnline ? "Online" : "Offline";
    const cardStyle = {
      width: '300px',
      marginRight: '10px',
      marginBottom: '10px',
      float: 'left'
    };
    return (
      <Card style={cardStyle}>
        <CardTitle
          title={email}
          subtitle={userStatus + ' - Balance: $' + balance } />
        <CardActions>
          <FlatButton label="Send" onClick={this.show.bind(this, 'pop')} />
          <FlatButton label="Request" />
        </CardActions>

        <Popover open={this.state.activePopover === 'pop'}
          anchorEl={this.state.anchorEl}
          onRequestClose={this.closePopover.bind(this, 'pop')}
          style={{backgroundColor: '#efefef'}}>
          <div style={{padding: 20}}>
            <h4>Transferring ${this.state.amount}</h4>
            {this.state.errorText ? this.renderErrorText() : null}
            <TextField
              hintText="Enter a $ amount"
              value={this.state.amount}
              onChange={this.handleAmountChange} />
            <br />
            <TextField
              hintText="Enter a message"
              value={this.state.message}
              onChange={this.handleMessageChange} />
            <br />
            <FlatButton label="Send" />
            <FlatButton label="Cancel" onClick={this.closePopover.bind(this, 'pop')}/>
          </div>
        </Popover>
      </Card>
    );
  }
});
