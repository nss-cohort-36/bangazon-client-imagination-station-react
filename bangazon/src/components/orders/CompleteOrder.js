import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

// Author: Lauren Riddle
// Purpose: To load complete order view and allow a user to select a payment type
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
        width: 500,
    },
});

class CompleteOrder extends Component {

    state = {
        paymenttypes: [],
        PaymentTypeId: null,
    };


    componentDidMount() {
        // get all payment types
        APIManager.getAll("paymenttypes")
            .then((response) => {
                this.setState({
                    paymenttypes: response
                })
            })

    }
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    completeOrder = () => {
        // create object to be sent to DB
        const order = {
            payment_type_id: this.state.PaymentTypeId,
            created_at: this.props.history.location.state.order.created_at,
            customer_id: this.props.history.location.state.order.customer_id,
            id: this.props.match.params.orderId
        }
        
        if (this.state.PaymentTypeId !==  null) {
            // Make a put with the order to the API
            APIManager.update("orders", order, this.props.match.params.orderId)
                .then(() => {
                    // pushes you to thank you page for the order just completed
                    this.props.history.push(`/thankyou`)
                })
        } else {
            // renders and alert based on what is missing from the payment form
            if (this.state.PaymentTypeId === null) {
                alert('Please select a payment type to complete your order.')
            } 
        }
    }


    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="complete-order-container">
                    

                    <TextField
                            id="outlined-select-currency"
                            select
                            label="Select Payment"
                            className={classes.textField}
                            onChange={this.handleChange('PaymentTypeId')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select a payment type"
                            margin="normal"
                            variant="outlined"
                        >
                            {this.state.paymenttypes.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.merchant_name} {option.account_number} EXP: {option.expiration_date}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button variant="contained" color="secondary" className={classes.button}
                        onClick={() =>{ 
                            if (this.state.PaymentTypeId === null) {
                                alert('Please select a payment type to complete your order.')
                            } else {
                        this.completeOrder()
                       }}}>
                        Complete Order
                    </Button>

                </div>
            </>
        );
    }
}

export default withStyles(styles)(CompleteOrder)