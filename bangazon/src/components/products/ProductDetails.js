/*
    ProductDetail.js

    Purpose:    This component is responsible for displaying the information
                for a single product. 

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'


class ProductDetail extends Component {
    state = {
        title: '',
        description: '',
        quantity: 0,
        pricePerUnit: 0,
        loadingStatus: true
    }

    componentDidMount() {
        // take id from props, fetch call to get product
        // then, put info into state
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
                        <li>Price per unit: {this.state.price}</li>
                        <li>Quantity available: {this.state.price}</li>
                    </ul>
                </div>

            </ReactFragment>
        )
    }
}

export default ProductDetail