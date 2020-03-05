import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";
import "./Product.css";
import APIManager from '../../modules/APIManager'


class ProductCategories extends Component {
    state = {
        producttypes: []
    }

    componentDidMount() {
        APIManager.getAll("producttypes", "?customer=true")
            .then((producttypes) => {
                console.log(producttypes)
                this.setState({
                    producttypes: producttypes
                })
            })
    }
    render() {
        return (
            <>
                <Typography variant="h2" component="h1">Product Categories</Typography>
                {
                    this.state.producttypes.map(producttype =>
                            <List key={producttype.id}>
                                <Typography variant="h4" key={producttype.id}>
                                    {producttype.name}
                                </Typography>
                                {producttype.products.map(product => {
                                    return (
                                        <ListItem key={product.id}>
                                            <Typography color="textSecondary" variant="h5" gutterBottom key={product.id}>
                                                {product.name}
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom >
                                                <Link to={`/product/${product.id}`} className="product-link">Details</Link>
                                            </Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                    )
                }
            </>
        )
    }
}

export default ProductCategories;