import React, { Component }  from 'react';
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

    render(){
        return(
            <>
                <Typography variant="h5" component="h1">Product Categories</Typography>
            </>
        )
    }
}

export default ProductCategories;