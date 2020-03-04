import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import "./Home.css"
import "../products/Product.css"
import MyProductCard from "../products/MyProductCard"

// Author: Lauren Riddle
// Purpose: To display home page

class Home extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        APIManager.getAll("products")
            .then((products) => {
                let twentyproducts = []
                let index = 0
                products.map(product => {
                    if (index < 20) {
                        twentyproducts.push(product)
                        index++
                    }
                })
                this.setState({
                    products: twentyproducts
                })
            })
    }

    render() {

        return (
            <>

                <div className="home-container">

                    <div className="smaller-home-container">
                        <h1>Welcome to Bangazon Prime!</h1>
                    </div>

                </div>
                <section className="my-products-container products-home-container">
                {this.state.products.map(product=> {
                return <MyProductCard myProductCard={product} {...this.props}/>
                })}
                </section>
            </>

        );
    }
}

export default Home