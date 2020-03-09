import React, { Component } from "react"
// import "./Login.css"
import { login, isAuthenticated } from "../../modules/simpleAuth"
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

class Login extends Component {

  state = {
    username: "",
    password: ""
  }

  handleInputChange = (evt) => {
    let stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  // Simplistic handler for login submit
  handleLogin = (evt) => {
    evt.preventDefault()

    const credentials = {
      "username": this.state.username,
      "password": this.state.password
    }

    login(credentials)
      .then(() => {
        if (isAuthenticated()) {
          this.props.loggedIn()
          this.props.history.push("/")
        }
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
      <form className="new-product-form-container" onSubmit={this.handleLogin}>
        <h1>Please Login</h1>
          <TextField
            id="outlined-name product"
            label="Username"
            className={classes.textField}
            onChange={this.handleChange('username')}
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
         
          <Button variant="contained" color="primary" className={classes.button} type="submit" >
            Sign in
              </Button>
      </form>
    )
  }
}

export default withStyles(styles)(Login)