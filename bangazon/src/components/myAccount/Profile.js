
import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import PaymentList from '../payment/PaymentList';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Profile.css"
import { Link } from "react-router-dom";

// Author: Lauren Riddle
// Purpose: To load user profile with payment types
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

class Profile extends Component {

    state = {
        paymenttypes: [],
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    getPaymentTypes = () => {
        // Gets all payment types, then sets them in state to load the cards later

        APIManager.getAll("paymenttypes")
            .then((response) => {
                this.setState({
                    paymenttypes: response
                })
            })
    }
    deletePaymentType = (id) => {
        APIManager.delete("paymenttypes", id)
            .then(() => {
                APIManager.getAll("paymenttypes")
                    .then((response) => {
                        this.setState({
                            paymenttypes: response
                        })
                    })
            })
    }



    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="profile-container">
                    <div className="payment-button-container">
                        {this.state.paymenttypes.length === 0 && 
                        
                        <Button id="payment-button" variant="contained" color="light" className={classes.button} disabled={this.state.loadingStatus}
                            onClick={() => this.getPaymentTypes()}>
                            View Payment Options
                        </Button>
                            }

                        <Button id="payment-button" variant="contained" color="dark" className={classes.button} disabled={this.state.loadingStatus}
                            onClick={() => this.props.history.push('/payment/new')}>
                            Add a New Payment Option
                    </Button>
                    <Button variant="contained">
                    <Link
                      to={{
                        pathname: `/orderhistory`,
                        
                      }} className="complete-order-button">
                      View Order History
                    </Link>
                  </Button>
                    </div>
                    <PaymentList paymenttypes={this.state.paymenttypes} deletePaymentType={this.deletePaymentType} />

                </div>
            </>
        );
    }
}

export default withStyles(styles)(Profile)