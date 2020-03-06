
import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import PaymentList from '../payment/PaymentList';
import { withStyles } from '@material-ui/core/styles';
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
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        zipcode: "",
        phone_number: "",
        isThere: false
    };

    componentDidMount() {
        //get User name, email, payment info
        APIManager.getAll("customers")
        .then((customer) => {
            this.setState({
                first_name: customer[0].user.first_name,
                last_name: customer[0].user.last_name,
                address: customer[0].address,
                city: customer[0].city,
                zipcode: customer[0].zipcode,
                phone_number: customer[0].phone
            })
        })
        APIManager.getAll("paymenttypes")
            .then((response) => {
                if (response.length !== 0) {
                    this.setState({
                        isThere: true
                    })
                }
            })
    }

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
                        if (response.length === 0) {
                            this.setState({
                                isThere: false,
                                paymenttypes: response
                            })
                        } else {
                            this.setState({
                                paymenttypes: response
                            })
                        }
                    })
            })
    }



    render() {


        const { classes } = this.props;

        return (
            <>
                <div className="profile-container">
                    <div className="profile-info">
                        <p>First Name: {this.state.first_name}</p>
                        <p>Last Name: {this.state.last_name}</p>
                        <p>Address: {this.state.address}</p>
                        <p>City: {this.state.city}</p>
                        <p>Zip Code: {this.state.zipcode}</p>
                        <p>Phone Number: {this.state.phone_number}</p>
                        <Button id="edit-details-button" variant="contained" color="light" className={classes.button} disabled={this.state.loadingStatus} onClick={() => this.props.history.push("/profile/update")}
                            >
                            Edit Profile
                        </Button>

                    </div>
                    <div className="payment-button-container">
                        {this.state.paymenttypes.length === 0 && this.state.isThere === true &&

                            <Button id="payment-button" variant="contained" color="inherit" className={classes.button} disabled={this.state.loadingStatus}
                                onClick={() => this.getPaymentTypes()}>
                                View Payment Options
                        </Button>
                        }

                        <Button id="payment-button" variant="contained" color="inherit" className={classes.button} disabled={this.state.loadingStatus}
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