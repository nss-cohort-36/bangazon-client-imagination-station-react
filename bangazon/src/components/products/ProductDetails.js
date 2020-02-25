/*
    ProductDetail.js

    Purpose:    This component is responsible for displaying the information
                for a single product. This handles functionality for adding a
                product to an order.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// API
import APIManager from '../../modules/APIManager'


class ProductDetail extends Component {
    state = {
        title: '',
        description: '',
        quantity: 0,
        pricePerUnit: 0,
        loadingStatus: true
    }

    handleAddToOrder = () => {
        /*
            Function to handle click event for add button. Adds product to order in database.
        
            Once completed, re-routes user to order view.
        */

        // sets loadingStatus to true to prevent duplicate adds
        this.setState({ loadingStatus: true })

        APIManager.get("orders")


    }

    componentDidMount() {
        // take id from props, fetch call to get product
        APIManager.get("products", this.props.productId)
            // then, put info into state
            .then(productObject => {
                this.setState({
                    title: productObject.name,
                    description: productObject.description,
                    quantity: productObject.quantity,
                    pricePerUnit: productObject.price,
                    loadingStatus: false
                })
            })
    }

    render() {
        return (
            <ReactFragment>
                <div className="img-container">
                    <img src={`https://robohash.org/${this.state.name}`} alt="Current User" />
                </div>
                <div className="product-detail-container">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>
                    <ul>
                        <li>Price: {this.state.price}</li>
                        <li>Quantity available: {this.state.price}</li>
                    </ul>
                    <button type="button" onClick={this.handleAddToOrder}>Add to Order</button>
                </div>


            </ReactFragment>
        )
    }
}

export default ProductDetail