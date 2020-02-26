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
import OrderAPIManager from '../../modules/OrderAPIManager'


class ProductDetail extends Component {
    state = {
        title: '',
        description: '',
        quantity: 0,
        price: 0,
        loadingStatus: true
    }

    handleAddOrderProduct = (newOrderProduct) => {
        // Handles posting a new orderProduct in the database
        APIManager.post("orderproducts/", newOrderProduct)
                    // then, push to the home page or another page
                    .then(response => console.log(response))
                    // .then(() => this.props.history.push('/order'))
    }

    handleAddToOrder = () => {
        /*
            Function to handle click event for add button. Adds product to order in database.
        
            Once completed, re-routes user to order view.
        */

        // sets loadingStatus to true to prevent duplicate adds
        this.setState({ loadingStatus: true })

        // GET open order for logged in customer
        OrderAPIManager.getUserOpenOrder()
            // then, post order to orderproduct in the database.
            .then(orderObject => {
                console.log("OrderObject: ", orderObject)
                // Check to see if this customer has an open order. If not, create a new order.
                if (orderObject.length < 1) {
                    /*
                        Make sure to add a trailing slash onto the end of orders.
                        Empty object passed as the POST for orders does not require
                        anything in the body.
                    */
                    APIManager.post("orders/", {})
                    .then(newOrderObject=> {
                        console.log("new order object: ", newOrderObject)
                    })
                }
                else {
                    console.log("already had an order.")
                    let newOrderProduct = {
                        order_id: orderObject[0].id,
                        product_id: this.props.productId
                    }
                    this.handleAddOrderProduct(newOrderProduct)
                }

                
            })
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
                    price: productObject.price,
                    loadingStatus: false
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="img-container">
                    <img src={`https://robohash.org/${this.state.name}`} alt="Current User" />
                </div>
                <div className="product-detail-container">
                    <h1>{this.state.title}</h1>
                    <p>{this.state.description}</p>
                    <ul>
                        <li>Price: ${this.state.price}</li>
                        <li>Quantity available: {this.state.quantity}</li>
                    </ul>
                    <button type="button" onClick={this.handleAddToOrder}>Add to Order</button>
                </div>
            </React.Fragment>
        )
    }
}

export default ProductDetail