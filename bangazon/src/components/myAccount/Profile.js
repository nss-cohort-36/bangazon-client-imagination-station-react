import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import PaymentList from '../payment/PaymentList';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                        console.log(response)
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
                    <Button variant="contained" color="secondary" className={classes.button} disabled={this.state.loadingStatus}
                        onClick={() => this.getPaymentTypes()}>
                        View Payment Options
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button} disabled={this.state.loadingStatus}
                        onClick={() => this.props.history.push('/payment/new')}>
                        Add a New Payment Option
                    </Button>
                    <PaymentList paymenttypes={this.state.paymenttypes} deletePaymentType={this.deletePaymentType} />

                </div>
            </>
        );
    }
}

export default withStyles(styles)(Profile)