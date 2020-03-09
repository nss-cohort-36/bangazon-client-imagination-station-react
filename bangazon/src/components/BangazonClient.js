import React, { Component } from 'react';
import NavBar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'
import APIManager from '../modules/APIManager'
import { withRouter } from "react-router";

class BangazonClient extends Component {

    // fetchOrders = async () => {
    //     const orders = await APIManager.getAll("orders", "?customer=true&open=true")
    //     return orders.length
    // }
    state = {
        user: false,
        searchResults: [],
        productSearchField: "",
        citySearchField: "",
        productTypeId: ""
        // cartCount: this.fetchOrders()
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
    
    // This functions will handle search functionality
    handleInputChange = (evt) => {
        let stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    search = async (search_terms) => {
        // console.log(search_terms, 'search terms obj')

        let search_terms_string = ""

        if (search_terms.name && search_terms.location) {
            search_terms_string += `?name=${search_terms.name}&location=${search_terms.location}`
        } else if (search_terms.location) {
            search_terms_string += `?location=${search_terms.location}`
        } else if (search_terms.name) {
            search_terms_string += `?name=${search_terms.name}`
        } else if (search_terms.type) {
            search_terms_string += `?type=${search_terms.type}`
        }

        this.setState({ searchResults: await APIManager.getAll("products", search_terms_string) })

        this.props.history.push("/SearchResults")
    }

    doSearch = productTypeId => {
        let searchObj = {location: "", name: "", type: ""}
        searchObj.name = this.state.productSearchField
        searchObj.location = this.state.citySearchField
        searchObj.type = productTypeId
        this.search(searchObj)
    }


    render() {

        return (
            <>
                <NavBar doSearch={this.doSearch} loggedOut={this.loggedOut} {...this.props} />
                <ApplicationViews doSearch={this.doSearch} handleInputChange={this.handleInputChange} searchResults={this.state.searchResults} loggedOut={this.loggedOut} loggedIn={this.loggedIn} />
            </>
        )
    }
}

export default withRouter(BangazonClient);
