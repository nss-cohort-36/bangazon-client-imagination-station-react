import React, { Component } from 'react';
import NavBar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'

class BangazonClient extends Component { 
    state = {
        user: false,
        searchResults: []
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

    search = async (search_terms) => {

        console.log('this search func ran')
        console.log(search_terms, 'search terms obj')

        let search_terms_string = ""

        if (search_terms.location) {
            search_terms_string += `?location=${search_terms.location}`
        }

        if (search_terms.name) {
            search_terms_string += `?name=${search_terms.name}`
        }

        if (search_terms.name && search_terms.location) {
            search_terms_string += `?name=${search_terms.name}&location=${search_terms.location}`
        }

        this.setState({searchResults: await APIManager.get("products", search_terms_string)})
    }

    render() {

        return (
            <>
                <NavBar search={this.search} loggedOut={this.loggedOut} {...this.props}/>
                <ApplicationViews loggedOut={this.loggedOut} loggedIn={this.loggedIn}/>
            </>
        )
    }
}

export default BangazonClient;
