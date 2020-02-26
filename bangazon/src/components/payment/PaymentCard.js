import React, { Component } from "react"

class Payment extends Component {

  render() {
    const theDate = this.props.type.expiration_date
    const dateString = Date(this.props.type.expiration_date);
    return (
      <>
        <section className="paymenttype">
          <p>
            {this.props.type.merchant_name}
            {this.props.type.account_number}
            {dateString}
          </p>
        </section>
      </>
    )
  }
}

export default Payment