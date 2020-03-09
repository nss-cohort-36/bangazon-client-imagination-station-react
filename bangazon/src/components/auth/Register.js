import React, { Component } from "react"
// import { withRouter } from "react-router-dom"
import { register } from "../../modules/simpleAuth"
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../products/Product.css"

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

class Register extends Component {

  state = {
    email: "",
    userName: "",
    lastName: "",
    password: "",
    firstName: "",
    address: "",
    city: "",
    zipcode: "",
    phone: "",
    verifyPassword: ""
  }

  handleInputChange = (evt) => {
    let stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = event => {
    event.preventDefault()

    // Create object with values from state
    const newUser = {
      "username": this.state.userName,
      "first_name": this.state.firstName,
      "last_name": this.state.lastName,
      "email": this.state.email,
      "password": this.state.password,
      "address": this.state.address,
      "city": this.state.city,
      "zipcode": this.state.zipcode,
      "phone": this.state.phone
    }

    // Make a fetch call with the object as the body of the POST request
    register(newUser)
      .then(() => {
        this.props.loggedIn()
        this.props.history.push("/")
      })
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
      <form className="new-product-form-container" onSubmit={this.handleRegister}>
        <h1>Create your Bangazon Account</h1>
        <TextField
          id="outlined-name product"
          label="Username"
          className={classes.textField}
          onChange={this.handleChange('userName')}
          margin="normal"
          variant="outlined"
        />



        <TextField
          id="outlined-name product"
          label="First Name"
          className={classes.textField}
          onChange={this.handleChange('firstName')}
          margin="normal"
          variant="outlined"
        />


        <TextField
          id="outlined-name product"
          label="Last Name"
          className={classes.textField}
          onChange={this.handleChange('lastName')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-name product"
          label="Email"
          className={classes.textField}
          onChange={this.handleChange('email')}
          margin="normal"
          variant="outlined"
        />


        <TextField
          id="outlined-name product"
          label="Address"
          className={classes.textField}
          onChange={this.handleChange('address')}
          margin="normal"
          variant="outlined"
        />


        <TextField
          id="outlined-name product"
          label="City"
          className={classes.textField}
          onChange={this.handleChange('city')}
          margin="normal"
          variant="outlined"
        />


        <TextField
          id="outlined-name product"
          label="Zip Code"
          className={classes.textField}
          onChange={this.handleChange('zipcode')}
          margin="normal"
          variant="outlined"
        />



        <TextField
          id="outlined-name product"
          label="Phone"
          className={classes.textField}
          onChange={this.handleChange('phone')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-name product"
          label="Password"
          className={classes.textField}
          onChange={this.handleChange('password')}
          margin="normal"
          variant="outlined"
          type="password"

        />

        <TextField
          id="outlined-name product"
          label="Verify Password"
          className={classes.textField}
          onChange={this.handleChange('verifyPassword')}
          margin="normal"
          variant="outlined"
          type="password"
        />


        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Register
            </Button>
      </form>
    )
  }
}

export default withStyles(styles)(Register)