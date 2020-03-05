import MyProductCard from "./MyProductCard";
import React, { Component } from 'react';

import APIManager from '../../modules/APIManager'
import "./Product.css"

class MyProductList extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        APIManager.getAll("products", "?customer=true")
            .then((products) => {
                this.setState({
                    products: products
                })
            })
    }

    deleteProduct = id => {
        APIManager.delete("products", id)
            .then(() => {
                APIManager.getAll("products", "?customer=true")
                    .then((newProducts) => {
                        this.setState({
                            products: newProducts
                        })
                    })
            })
    }

    render() {
        return (
            <>
                <h1 className="my-products-header">My Products</h1>
                {/* maps through myproductcarts */}
                <div className="my-products-container">
                    {
                        this.state.products.map(products => <MyProductCard key={products.id} myProductCard={products} deleteProduct={this.deleteProduct}{...this.props} />)
                    }
                </div>
            </>
        )
    }
}

export default MyProductList;