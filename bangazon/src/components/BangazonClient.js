import React, { Component } from 'react';
import NavBar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'
import { withRouter } from "react-router";

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

    
    // This function is passed as props and will handle search functionality

    search = async (search_terms) => {


        let search_terms_string = ""

        if (search_terms.name && search_terms.location) {
            search_terms_string += `?name=${search_terms.name}&location=${search_terms.location}`
        } else if (search_terms.location) {
            search_terms_string += `?location=${search_terms.location}`
        } else if (search_terms.name) {
            search_terms_string += `?name=${search_terms.name}`
        }

        this.setState({ searchResults: await APIManager.getAll("products", search_terms_string) })

        this.props.history.push("/SearchResults")
    }

    render() {

        return (
            <>
                <NavBar search={this.search} loggedOut={this.loggedOut} {...this.props} />
                <ApplicationViews searchResults={this.state.searchResults} loggedOut={this.loggedOut} loggedIn={this.loggedIn} />
            </>
        )
    }
}

export default withRouter(BangazonClient);
