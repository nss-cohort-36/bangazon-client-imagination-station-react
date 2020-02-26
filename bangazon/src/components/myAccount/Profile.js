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
   
    
    getPaymentTypes () {
        // Gets all payment types, then sets them in state to load the cards later
        
        APIManager.get("paymenttypes/")
            .then((response) => {
                this.setState({
                    paymenttypes: response
                })
            })
    }
    deletePaymentType (id) {
        APIManager.delete("paymenttypes", id)
        .then((response)=>response.json())
        .then((res) => {
            console.log(res)
            // this.setState({
            //     paymenttypes: []
            // })
        })
    }

    render() {

        return (
            <>
                <div className="profile-container">
                    <button onClick={() => this.getPaymentTypes()}>View Payment Options</button>
                <PaymentList paymenttypes={this.state.paymenttypes} deletePaymentType={this.deletePaymentType}/>
                    
                </div>
            </>
        );
    }
}

export default Profile