import MyProductCard from "./MyProductCard";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import APIManager from '../../modules/APIManager'

class MyProductList extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        APIManager.get("products?customer=true")
            .then((products) => {
                this.setState({
                    products: products
                })
            })
    }

    deleteProduct = id => {
        APIManager.delete("products",id)
            .then(() => {
                APIManager.get("products?customer=true")
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

                    {
                        this.state.products.map(products => <MyProductCard key={products.id} myProductCard={products} deleteProduct={this.deleteProduct}{...this.props} />)
                    }
                </CardContent>

            </Card>
        )
    }
}

export default MyProductList;