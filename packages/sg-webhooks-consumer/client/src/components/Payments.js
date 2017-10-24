import React from 'react'
import { connect } from 'react-redux';
import * as actions from "../actions";
import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  calcDollars = cents => cents*100;
  render() {
    return (
      <StripeCheckout
        name = "Emaily"
        description = "Pay 5$ for 5 credits"
        amount = { this.calcDollars(5) }
        token = { token => this.props.handleToken(token) }
        stripeKey = {process.env.REACT_APP_stripePubKey} >
          <button className="btn">Add Credits</button>
      </StripeCheckout>
    )
  }
}

export default connect(null, actions)(Payments);
