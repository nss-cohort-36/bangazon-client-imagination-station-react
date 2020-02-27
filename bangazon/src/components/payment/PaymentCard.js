import React, { Component } from "react"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
//   dense: {
//     marginTop: 16,
//   },
//   menu: {
//     width: 200,
//   },
// });

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
class Payment extends React.Component {
  // Creates card for payment type
  render() {
    const { classes } = this.props;
    return (
      <>
        <section className="paymenttype">
          <Card>
            <CardContent>

              <Typography variant="h5" component="h2">
                Merchant: {this.props.type.merchant_name}
              </Typography>
              <Typography variant="h5" component="h5">
                Account Number: {this.props.type.account_number}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Expiration Date: {this.props.type.expiration_date}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="secondary" className={classes.button}
                onClick={() => {
                  this.props.deletePaymentType(this.props.type.id)

                }}>
                Delete
          </Button>
            </CardActions>
          </Card>
        </section>
      </>
    )
  }
}

export default withStyles(styles)(Payment)