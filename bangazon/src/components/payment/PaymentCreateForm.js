import APIManager from '../../modules/APIManager'
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../products/Product.css"
// Author: Lauren Riddle
// Purpose: To load form to create payment type
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

class PaymentCreateForm extends React.Component {

    state = {
        merchantName: "",
        accountNumber: "",
        month: "",
        year: ""
        
    };
    
    handleChange = name => event => {
        // Material UI field change func
        this.setState({
            [name]: event.target.value,
        });
    };

    savePaymentType = evt => {
        // Saves payment type to DB
        evt.preventDefault()
        const paymenttype = {
            merchant_name: this.state.merchantName,
            account_number: Number(this.state.accountNumber),
            expiration_date: `${Number(this.state.month)}/${Number(this.state.year)}`,
           
        }
        // Checks to see if the date the user entered has not already past
        const today = new Date();
        const someday = new Date();
        someday.setFullYear(Number(this.state.year), Number(this.state.month), 1)

        if (this.state.merchantName !== "" && this.state.accountNumber !== "" && this.state.expirationDate !== "" && someday > today) {
            // Make a post with the product to the API
            APIManager.post("paymenttypes", paymenttype)
                .then((response) => {
                    // pushes you to product detail for the product just created
                    this.props.history.push(`/profile`)
                })
        } else {
            // renders and alert based on what is missing from the product form
            if (this.state.merchantName === "") {
                alert('Please input a merchant name.')
            } else if (this.state.accountNumber === null) {
                alert('Please input an account number.')
            } else if (this.state.expirationDate === null) {
                alert('Please input a expiration date.')
            } else if (isNaN(this.state.year)|| isNaN(this.state.month)) {
                alert("Please enter an integer in the month and year fields.")
            } else if ((someday > today) === false) {
                alert('Please enter an expiration date that is not expired.')
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="new-product-form-container">
                    <h2 className="add-payment-header">Add a New Payment Type</h2>

                    <form className="new-product-form" >
                        <TextField
                            id="outlined-name product"
                            label="Merchant Name"
                            className={classes.textField}
                            onChange={this.handleChange('merchantName')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name product"
                            label="Account Number"
                            className={classes.textField}
                            onChange={this.handleChange('accountNumber')}
                            margin="normal"
                            type="number"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-number product"
                            label="MM"
                            onChange={this.handleChange('month')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            inputProps={{maxLength: 2}}
                            />
                        <TextField
                            inputProps={{maxLength: 4}}
                            id="outlined-number product"
                            label="YYYY"
                            onChange={this.handleChange('year')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        
                       
                        <Button variant="contained" color="primary" className={classes.button} disabled={this.state.loadingStatus}
                            onClick={this.savePaymentType}>
                            Save
                        </Button>
                      
                    </form>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(PaymentCreateForm)