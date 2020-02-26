import MyProductCard from "./MyProductCard";
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import APIManager from '../../modules/APIManager'

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
        APIManager.delete("products",id)
            .then(() => {
                APIManager.getAll("products", "?customer=true")
                    .then((newProducts) => {
                        console.log("new", newProducts)
                        this.setState({
                            products: newProducts
                        })
                    })
            })
    }

    render() {
        return (
            <Card >
                <CardContent>
                    {/* maps through myproductcarts */}
                    {
                        this.state.products.map(products => <MyProductCard key={products.id} myProductCard={products} deleteProduct={this.deleteProduct}{...this.props} />)
                    }
                </CardContent>

            </Card>
        )
    }
}

export default MyProductList;