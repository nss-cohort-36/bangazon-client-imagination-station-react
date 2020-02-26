import APIManager from '../../modules/APIManager'
import React from 'react'
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

class PaymentCreateForm extends React.Component {

    state = {
        merchantName: "",
        accountNumber: "",
        month: "",
        year: ""
        
    };
    
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    savePaymentType = evt => {
        evt.preventDefault()
        const paymenttype = {
            merchant_name: this.state.merchantName,
            account_number: Number(this.state.accountNumber),
            expiration_date: `${this.state.month}/${this.state.year}`,
           
        }

        if (this.state.merchantName !== "" && this.state.accountNumber !== "" && this.state.expirationDate !== "" ) {
            // Make a post with the product to the API
            APIManager.post("paymenttypes/", paymenttype)
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
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="new-product-form-container">
                    <h2>Add a New Payment Type</h2>

                    <form >
                        <TextField
                            id="outlined-name"
                            label="Merchant Name"
                            className={classes.textField}
                            onChange={this.handleChange('merchantName')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Account Number"
                            className={classes.textField}
                            onChange={this.handleChange('accountNumber')}
                            margin="normal"
                            type="number"
                            variant="outlined"
                        />
                        <TextField
                            inputProps={{maxLength: 2}}
                            id="outlined-number"
                            label="MM"
                            onChange={this.handleChange('month')}
                            className={classes.textField}
                            maxLength="2"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            inputProps={{maxLength: 4}}
                            id="outlined-number"
                            label="YYYY"
                            onChange={this.handleChange('year')}
                            className={classes.textField}
                            maxLength="4"
                            margin="normal"
                            variant="outlined"
                        />
                        
                       
                        <Button variant="contained" color="secondary" className={classes.button} disabled={this.state.loadingStatus}
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