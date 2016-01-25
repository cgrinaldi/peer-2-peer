import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';

const Transactions = React.createClass({
  renderTransactions () {
    // TODO: Use moment to format timestamps
    // TODO: Use Material-UI table ()
    return this.props.transactions.map((transaction) => {
      return <li>{transaction.from} paid ${transaction.amount} to {transaction.to} on {transaction.timestamp}</li>;
    });
  },

  render () {
    console.log(this.props.transactions);
    return (
      <ul>
        {this.renderTransactions()}
      </ul>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
