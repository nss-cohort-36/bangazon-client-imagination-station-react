import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import "./Order.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { ListItemText, Typography } from "@material-ui/core";
//CARDS
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

class OrderHistoryDetail extends Component {
    state = {
        order: {},
        products: [],
        total: null
    }

    componentDidMount() {
        // Get the selected order
        APIManager.getOne("orders", `${this.props.match.params.orderId}`)
            .then((response) => {

                this.setState({
                    order: response
                })
                // Get all products related to the selected order
                APIManager.getAll(
                    "orderproducts",
                    `?order=${this.props.match.params.orderId}`
                )
                    .then((response) => {

                        this.setState({
                            products: response
                        })
                        // Count the total price of the products in the order
                        this.totalPrice()
                    })
            })

    }

    totalPrice = () => {
        let total = 0

        this.state.products.map(product => {
            // add the product price to the order total
            return total += Number(product.product.price);
        })
        // set order total in state
        this.setState({

            total: total
        })

    }
    render() {

        return (
            <Card className="order-history-detail">
                <CardContent>

                    <List >
                        <ListItem  key={this.state.order.id}>
                            <List id="list-item-history">
                                <Typography>Order #{this.state.order.id} ({this.state.order.created_at})</Typography>
                                {this.state.products.map(product => (
                                    <ListItem key={product.id}>
                                        <ListItemText >
                                            <Typography variant="h6" component="h6">
                                                {product.product.name}
                                            </Typography>

                                            <Typography color="textSecondary" gutterBottom>
                                                Price: ${product.product.price}
                                            </Typography>
                                        </ListItemText>


                                    </ListItem>
                                ))}
                                <ListItem style={{ alignItems: "flex-end" }}>
                                    <ListItemText>
                                        <Typography variant="h6" component="h2">Order Total: ${this.state.total}</Typography>
                                    </ListItemText>
                                </ListItem>
                                <CardActions>

                                </CardActions>
                            </List>
                        </ListItem>

                    </List>
                </CardContent>
            </Card>
        );
    }
};

export default OrderHistoryDetail;