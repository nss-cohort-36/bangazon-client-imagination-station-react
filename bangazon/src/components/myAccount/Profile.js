import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import PaymentList from '../payment/PaymentList';


class Profile extends Component {

    state = {
        paymenttypes: [],
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    componentDidMount() {
        // Gets all product types, then sets them in state to load the dropdown later
        APIManager.get("paymenttypes")
            .then((response) => {
                console.log("HI",response)
                this.setState({
                    paymenttypes: response
                })
            })
    }
  

    render() {

        return (
            <>
                <div className="profile-container">
                <PaymentList paymenttypes={this.state.paymenttypes} />
                    
                </div>
            </>
        );
    }
}

export default Profile