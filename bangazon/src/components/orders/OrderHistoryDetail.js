/*
  OrderDetail
  displays a single open order
  button for complete order
  presented payment type on clicking button
  user selects payment type
  user clicks done
  payment type added to the order at this point
  user presented with confirmation/thank you screen
*/

import React, { Component } from "react";
import { Link } from "react-router-dom";
import APIManager from "../../modules/APIManager";
import "./Order.css";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";

import { ListItemText, Typography } from "@material-ui/core";
//CARDS
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = {
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

class OrderHistoryDetail extends Component {
    state = {
        order: {},
        products: [],
        total: null
    }
    componentDidMount() {
        APIManager.getOne("orders", `${this.props.match.params.orderId}`)
            .then((response) => {

                this.setState({
                    order: response
                })
                APIManager.getAll(
                    "orderproducts",
                    `?order=${this.props.match.params.orderId}`
                )
                    .then((response) => {

                        this.setState({
                            products: response
                        })
                        this.totalPrice()
                    })
            })

    }

    totalPrice = () => {
        let total = 0
        this.state.products.map(product => {
            total += Number(product.product.price);
        })
        this.setState({
            total: total
        })

    }
    render() {

        return (
            <Card>
                <CardContent>

                    <List>
                        <ListItem key={this.state.order.id}>
                            <List>
                                <Typography>Order #{this.state.order.id} ({this.state.order.created_at})</Typography>
                                {this.state.products.map(product => (
                                    <ListItem key={product.id}>
                                        <ListItemText>
                                            <Typography variant="h5" component="h2">
                                                {product.product.name}:{" "}
                                            </Typography>

                                            <Typography color="textSecondary" gutterBottom>
                                                Price: ${product.product.price}
                                            </Typography>
                                        </ListItemText>


                                    </ListItem>
                                ))}
                                <ListItem style={{ alignItems: "flex-end" }}>
                                    <ListItemText>
                                        <Typography component="p">Total: ${this.state.total}</Typography>
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