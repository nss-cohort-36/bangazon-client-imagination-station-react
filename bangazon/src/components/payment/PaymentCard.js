import React, { Component } from "react"

class Payment extends Component {

  render() {
    const dateString = Date(this.props.type.expiration_date);
    return (
      <>
        <section className="paymenttype">
          
            <h2>Merchant: {this.props.type.merchant_name}</h2>
            <h3>Account Number: {this.props.type.account_number}</h3>
            <h4>Expiration Date: {dateString}</h4>
            <button onClick={() => {
              this.props.deletePaymentType(this.props.type.id)
            
            }}>Delete</button>
        </section>
      </>
    )
  }
}

export default Payment