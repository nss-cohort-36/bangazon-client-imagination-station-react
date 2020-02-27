/*
    ProductDetail.js

    Purpose:    This component is responsible for displaying the information
                for a single product. This handles functionality for adding a
                product to an order.

    Author(s): Ryan Crowley
*/

// REACT
import React, { Component } from 'react'

// API
import APIManager from '../../modules/APIManager'
import OrderAPIManager from '../../modules/OrderAPIManager'

//CARDS
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class ProductDetail extends Component {
    state = {
        title: '',
        description: '',
        quantity: 0,
        price: 0,
        loadingStatus: true
    }

    handleAddOrderProduct = (newOrderProduct) => {
        // Handles posting a new orderProduct in the database
        APIManager.post("orderproducts", newOrderProduct)
            // then, push to the home page or another page
            .then(() => this.props.history.push('/order'))
    }

    handleAddToOrder = () => {
        /*
            Function to handle click event for add button. Adds product to order in database.
        
            Once completed, re-routes user to order view.
        */

        // sets loadingStatus to true to prevent duplicate adds
        this.setState({ loadingStatus: true })

        // Decrement the quantity of the product by 1
        APIManager.update(
            "products",
            {
                name: this.state.title,
                description: this.state.description,
                quantity: (this.state.quantity - 1),
                price: this.state.price,
                location: this.state.product.location,
                image_path: this.state.product.image_path,
                customer_id: this.state.product.customer.id,
                product_type_id: this.state.product.product_type.url.split("/")[4]
            },
            this.state.product.id
        )

        // GET open order for logged in customer
        .then(() => OrderAPIManager.getUserOpenOrder())
            // then, post order to orderproduct in the database.
            .then(orderObject => {
                // Check to see if this customer has an open order. If not, create a new order.
                if (orderObject.length < 1) {
                    /*
                        Make sure to add a trailing slash onto the end of orders.
                        Empty object passed as the POST for orders does not require
                        anything in the body.
                    */
                    APIManager.post("orders", {})
                        .then(newOrderObject => {
                            let newOrderProduct = {
                                order_id: newOrderObject.id,
                                product_id: this.props.productId
                            }
                            this.handleAddOrderProduct(newOrderProduct)
                        })
                }
                else {
                    let newOrderProduct = {
                        order_id: orderObject[0].id,
                        product_id: this.props.productId
                    }
                    this.handleAddOrderProduct(newOrderProduct)
                }


            })
    }

    componentDidMount() {
        // take id from props, fetch call to get product
        APIManager.getOne("products", this.props.productId)
            // then, put info into state
            .then(productObject => {
                this.setState({
                    title: productObject.name,
                    description: productObject.description,
                    quantity: productObject.quantity,
                    price: productObject.price,
                    product: productObject,
                    loadingStatus: false
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardContent>
                        <div className="img-container">
                            <img src={`https://robohash.org/${this.state.name}`} alt="Current User" />
                        </div>
                        <Typography variant="h5" component="h2">{this.state.title}</Typography>
                        <Typography color="textSecondary" gutterBottom>{this.state.description}</Typography>
                        <Typography component="p">
                            <ul>
                                <li>Price: ${this.state.price}</li>
                                <li>Quantity available: {this.state.quantity}</li>
                            </ul>
                        </Typography>
                        <CardActions>
                            {this.state.quantity > 0 ?
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={this.handleAddToOrder}>Add to Order
                                </Button>
                                : null
                            }
                        </CardActions>
                    </CardContent>

                </Card>

            </React.Fragment>
        )
    }
}

export default withStyles(styles)(ProductDetail);