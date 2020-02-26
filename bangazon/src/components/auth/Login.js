import React, { Component } from "react"
// import "./Login.css"
import { login, isAuthenticated } from "../../modules/simpleAuth"


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

    render() {
      return (
          <form onSubmit={this.handleLogin}>
            <h1>Please sign in</h1>
            <fieldset>
              <label htmlFor="username"> Username </label>
              <input onChange={this.handleInputChange}
                type="username"
                id="username"
                placeholder="Username"
                required autoFocus />
            </fieldset>
            <fieldset>
              <label htmlFor="password"> Password </label>
              <input onChange={this.handleInputChange}
                type="password"
                id="password"
                placeholder="Password"
                required />
            </fieldset>
            <fieldset>
              <button type="submit">
                  Sign in
              </button>
            </fieldset>
          </form>
    )
  }
}

export default Login