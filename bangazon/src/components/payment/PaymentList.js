import React, { Component } from "react"
import Payment from "./PaymentCard"
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import './Payment.css'
// Author: Lauren Riddle
// Purpose: To create payment type list
class PaymentList extends Component {
  // Creates the list for payment types. 
  render() {
    return (
      <>
        {/* <Card > */}
            {/* <CardContent> */}
            <article className="paymentList">
              {
                this.props.paymenttypes.map(type =>
                  <Payment
                    key={type.id}
                    type={type}
                    deletePaymentType={this.props.deletePaymentType}
                  />)
              }

            </article>
            {/* </CardContent>
            </Card> */}
          
      </>
    )
  }
}

export default PaymentList