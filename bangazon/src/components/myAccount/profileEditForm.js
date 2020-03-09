import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../products/Product.css"
import { withStyles } from '@material-ui/core/styles';

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
                this.setState({
                    first_name: customer[0].user.first_name,
                    last_name: customer[0].user.last_name,
                    address: customer[0].address,
                    city: customer[0].city,
                    zipcode: customer[0].zipcode,
                    phone_number: customer[0].phone
                })
            })
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //Make sure you notice that this object's ket=y are the exact name that the api is expecting
    updateProfile = evt => {
        evt.preventDefault()
        const formUpdate = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            address: this.state.address,
            city: this.state.city,
            zipcode: this.state.zipcode,
            phone: this.state.phone_number
        }
        APIManager.profile_update("customers", formUpdate)
        this.props.history.push("/profile")
    }
    handleChange = name => event => {
        // Material UI field change func
        this.setState({
          [name]: event.target.value,
        });
      };


    render() {
        const { classes } = this.props;

        return (
            <>
                <div className="profile-container">
                    <form className="profile-info new-product-form-container">
                        <TextField
                            required
                            onChange={this.handleChange('first_name')}
                            id="first_name product"
                            value={this.state.first_name}
                            label="First Name"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleChange('last_name')}
                            id="last_name product"
                            value={this.state.last_name}
                            label="Last Name"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleChange('address')}
                            id="address product"
                            value={this.state.address}
                            label="Address"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleChange('city')}
                            id="city product"
                            value={this.state.city}
                            label="City"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleChange('zipcode')}
                            id="zipcode product"
                            value={this.state.zipcode}
                            label="Zip Code"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            onChange={this.handleChange('phone_number')}
                            id="phone_number product"
                            value={this.state.phone_number}
                            label="Phone Number"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button variant="contained" color="primary"
                            onClick={this.updateProfile}
                        >Save Profile
                    </Button>
                    </form>
                </div>

            </>
        );
    }
}

export default withStyles(styles) (ProfileEditForm)