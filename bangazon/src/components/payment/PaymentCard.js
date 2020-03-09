import React from "react"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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
       
        <span id="payment-type-card">
          <Typography variant="h5" component="h2">
            {this.props.type.merchant_name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Account Number: {this.props.type.account_number}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Expiration Date: {this.props.type.expiration_date}
          </Typography>
          {/* </CardContent> */}
          <CardActions>
            <Button variant="contained" color="secondary" className={classes.button}
              onClick={() => {
                this.props.deletePaymentType(this.props.type.id)

              }}>
              Delete
          </Button>
          </CardActions>
        </span>
       
      </>
    )
  }
}

export default withStyles(styles)(Payment)