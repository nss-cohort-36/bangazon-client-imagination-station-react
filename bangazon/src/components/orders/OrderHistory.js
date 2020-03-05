import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import OrderCard from "./OrderCard"
import "./Order.css"

// Author: Lauren Riddle
// Purpose: To load complete order view and allow a user to select a payment type
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 500,
    },
});

class OrderHistory extends Component {

    state = {
        orders: [],
    };


    componentDidMount() {
        // get all payment types
        APIManager.getAll("orders", "?customer=true")
            .then((response) => {
                const orders = []
                response.map((order) => {
                    if (order.payment_type_id !== null) {
                        orders.push(order)
                    }
                })
                this.setState({
                    orders: orders
                })
            })

    }





    render() {
        const { classes } = this.props;

        return (
            <>
            <h1 className="my-orders">My Orders</h1>
                <div className="order-history-container">
                    {this.state.orders.map((order) => {
                        return <OrderCard key={order.id} order={order} />
                    })
                    }
    
                </div>
            </>
        );
    }
}

export default withStyles(styles)(OrderHistory)