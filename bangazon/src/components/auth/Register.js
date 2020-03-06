import React, { Component } from "react"
// import { withRouter } from "react-router-dom"
import { register } from "../../modules/simpleAuth"

class Register extends Component {

  state = {
    email: "",
    userName: "",
    lastName: "",
    password: "",
    firstName: "",
    verifyPassword: "",
    address: "",
    city: "",
    zipCode: "",
    phoneNumber: ""
  }

  handleInputChange = (evt) => {
    let stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = event => {
    event.preventDefault()

    const { userName, firstName, lastName, email, password, address, city, zipCode, phoneNumber } = this.state;
    // Create object with values from state
    const newUser = {
      "username": userName,
      "first_name": firstName,
      "last_name": lastName,
      "email": email,
      "password": password,
      "address": address,
      "city": city,
      "zipcode": zipCode,
      "phone": phoneNumber
    }

    // Make a fetch call with the object as the body of the POST request
    register(newUser)
    .then(() => {
      this.props.loggedIn()
      this.props.history.push("/")
    })
  }

  render() {
    return (
        <form className="form--login" onSubmit={this.handleRegister}>
          <h1>Create your Bangazon account</h1>
          <fieldset>
            <label htmlFor="userName"> Username </label>
            <input onChange={(evt) => this.handleInputChange(evt)}
              id="userName"
              type="text"
              name="userName"
              placeholder="Username"
              required autoFocus />
          </fieldset>
          <fieldset>
            <label htmlFor="firstName"> First Name </label>
            <input onChange={this.handleInputChange}
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First name"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="address"> Address </label>
            <input onChange={this.handleInputChange}
              id="address"
              type="text"
              name="address"
              placeholder="Address"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="city"> City </label>
            <input onChange={this.handleInputChange}
              id="city"
              type="text"
              name="city"
              placeholder="City"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="zipCode"> Zip Code </label>
            <input onChange={this.handleInputChange}
              id="zipCode"
              type="text"
              name="zipCode"
              placeholder="Zip code"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="phoneNumber"> Phone Number </label>
            <input onChange={this.handleInputChange}
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="lastName"> Last Name </label>
            <input onChange={this.handleInputChange}
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last name"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input onChange={this.handleInputChange}
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input onChange={this.handleInputChange}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required />
          </fieldset>
          <fieldset>
            <label htmlFor="verifyPassword"> Verify Password </label>
            <input onChange={this.handleInputChange}
              id="verifyPassword"
              type="password"
              name="verifyPassword"
              placeholder="Verify password"
              required />
          </fieldset>
          <fieldset>
            <button type="submit">
              Register
            </button>
          </fieldset>
        </form>
    )
  }
}

export default Register