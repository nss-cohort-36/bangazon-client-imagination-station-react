// Author: Michelle Johnson
// Purpose: Display product categories and first 3 products in that category

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";
import "./Product.css";
import APIManager from '../../modules/APIManager'
import Button from '@material-ui/core/Button';


class ProductCategories extends Component {
    state = {
        producttypes: []
    }

    componentDidMount() {
        APIManager.getAll("producttypes", "?customer=true")
            .then((producttypes) => {
                this.setState({
                    producttypes: producttypes
                })
            })
    }
    render() {
        return (
            <>
                <Typography id="product-categories-h1" component="h2">Product Categories</Typography>
                <section id="product-cat-container">
                    {
                        this.state.producttypes.map(producttype =>
                            <List id="product-cat-card" key={producttype.id}>
                                <Typography variant="h5" key={producttype.id}>
                                    {producttype.name}
                                    {/* displays how many products are in that category  */}
                                    <span> ({producttype.products.length})</span>
                                </Typography>
                                {producttype.products.slice(0, 3).map(product => {
                                    return (
                                        <ListItem key={product.id}>
                                            <Typography color="textSecondary" gutterBottom key={product.id}>
                                                {product.name}
                                            </Typography>
                                            <Typography color="textSecondary" gutterBottom >
                                                <Link to={`/product/${product.id}`} className="product-detail-button" >Details</Link>
                                            </Typography>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        )
                    }
                </section>
            </>
        )
    }
}

export default ProductCategories;