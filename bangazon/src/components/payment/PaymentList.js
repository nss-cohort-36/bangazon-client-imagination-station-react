import React, { Component } from "react"
import Payment from "./PaymentCard"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class PaymentList extends Component {
  // Creates the list for payment types
  render() {
    return (
      <>
        <Card >
          <CardContent>
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
          </CardContent>
        </Card>
      </>
    )
  }
}

export default PaymentList