import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
class Payment extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <>
        <section className="paymenttype">

          <h2>Merchant: {this.props.type.merchant_name}</h2>
          <h3>Account Number: {this.props.type.account_number}</h3>
          <h4>Expiration Date: {this.props.type.expiration_date}</h4>
          <Button variant="contained" color="secondary" className={classes.button}
            onClick={() => {
              this.props.deletePaymentType(this.props.type.id)

            }}>
            Delete
          </Button>
        </section>
      </>
    )
  }
}

export default withStyles(styles)(Payment)