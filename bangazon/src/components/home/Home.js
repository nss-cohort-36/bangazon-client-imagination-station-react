import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import "./Home.css"
import SearchCard from "../products/searchCard"

// Author: Lauren Riddle
// Purpose: To display home page with top 20 products

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
                    }return twentyproducts
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
                <h1 className="bangazon-top-20">Bangazon's Top 20</h1>
                <section className="products-home-container">

                    {this.state.products.map(product => {
                        return <SearchCard
                            key={product.id}
                            product={product}
                            name={product.name}
                            price={product.price}
                            imagePath={product.image_path}
                        />
                    })}
                </section>
            </>

        );
    }
}

export default Home