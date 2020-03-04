import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class ProfileEditForm extends Component {

    state = {
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        zipcode: "",
        phone_number: ""
    }

    componentDidMount() {
        //get User name, email, payment info
        APIManager.getAll("customers")
            .then((customer) => {
                console.log(customer, "customer object")
                this.setState({
                    first_name: customer[0].user.first_name,
                    last_name: customer[0].user.last_name,
                    address: customer[0].address,
                    city: customer[0].city,
                    zipcode: customer[0].zipcode,
                    phone_number: customer[0].phone
                })
            })
        // .then((response) => console.log("UserProfile response", response))
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateProfile = evt => {
        evt.preventDefault()
        const formUpdate = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            address: this.state.address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            phone_number: this.state.phone_number
        }
        APIManager.post("customers", formUpdate)
    }



    render() {

        return (
            <>
                <div className="profile-container">
                    <form className="profile-info">
                        <TextField
                            required
                            onChange={this.handleFieldChange}
                            id="first_name"
                            label="First Name"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleFieldChange}
                            id="last_name"
                            label="Last Name"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleFieldChange}
                            id="address"
                            label="Address"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleFieldChange}
                            id="city"
                            label="City"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleFieldChange}
                            id="zipcode"
                            label="Zip Code"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleFieldChange}
                            id="phone_number"
                            label="Phone Number"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button id="edit-details-button" variant="contained" color="light"  disabled={this.state.loadingStatus}
                            onClick={() => this.updateProfile}
                        >Save Profile
                    </Button>
                    </form>
                </div>

            </>
        );
    }
}

export default ProfileEditForm