import React, { Component } from "react"
import Payment from "./PaymentCard"

class PaymentList extends Component {

  render() {
    return (
      <>
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
      </>
    )
  }
}

export default PaymentList