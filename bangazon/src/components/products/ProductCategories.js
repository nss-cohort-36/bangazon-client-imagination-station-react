import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import "./Product.css";
import APIManager from '../../modules/APIManager'


class ProductCategories extends Component {
    state = {
        products: []
    }

    componentDidMount() {
        APIManager.getAll("producttypes", "?customer=true")
            .then((products) => {
                console.log(products)
                this.setState({
                    products: products
                })
            })
    }
    render() {
        return (
            <>
                <Typography variant="h3" component="h1">Product Categories</Typography>
                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        {
                            this.state.products.map(product =>
                                <Typography variant="h5" >
                                    {product.name}
                                </Typography>
                            )
                        }
                        <Typography variant="h6">
                            Text only
                        </Typography>
                        <div>
                            <List>
                            </List>
                        </div>
                    </Grid>
                </Grid>

            </>
        )
    }
}

export default ProductCategories;