import React, { Component } from 'react';
import NavBar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'

class BangazonClient extends Component { 
    state = {
        user: false
    }

    loggedIn = () => {
        // this resets state on login so that navbar refreshes
        this.setState({
            user: true
        })
    }

    loggedOut = () => {
        this.setState({
            user: false
        })

    }

    render() {

        return (
            <>
                <NavBar loggedOut={this.loggedOut} {...this.props}/>
                <ApplicationViews loggedOut={this.loggedOut} loggedIn={this.loggedIn}/>
            </>
        )
    }
}

export default BangazonClient;
