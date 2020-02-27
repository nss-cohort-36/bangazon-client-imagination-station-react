/*
author: Ken "Yeah, sorry, I broke that" Boyd
*/

import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import "./Order.css";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

const OrderDetail = props => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    const orders = await APIManager.getAll(
      "orders",
      "?customer=true&open=true"
    );
    for (const order of orders) {
      const products = await APIManager.getAll(
        "orderproducts",
        `?order=${order.id}`
      );
      order["products"] = products;
    }

    return orders;
  };

  useEffect(() => {
    orders.forEach(order => {
      order["total"] = order.products
        ? order.products.reduce((total, product) => {
            return total + Number(product.product.price);
          }, 0)
        : 0;
    });
  }, [orders]);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      // You can await here
      const response = await fetchOrders();
      setOrders(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleCancelOrder = orderId => {
    let confirmation = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmation) {
      APIManager.delete("orders", orderId).then(() => {
        props.history.push("/");
      });
    }
  };

  const deleteCartItem = async (orderProductId, order) => {
    if (order.products.length > 1) {
      await APIManager.delete("orderproducts", orderProductId);
      const orders = await fetchOrders();
      setOrders(orders);
    } else {
      handleCancelOrder(order.id);
    }
    props.history.push("/order");
  };

  return isLoading ? (
    <div>Loading, please wait</div>
  ) : (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
      <h2>{orders.length > 1 ? "Open Orders" : "Open Order"} </h2>
      <List>
        {orders.map(order => (
          <ListItem key={order.id}>
            <List
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}>
              <Typography style={{ alignSelf: "center" }}>
                Order #{order.id}
              </Typography>
              {order.products.map(product => (
                <ListItem key={product.id}>
                  <ListItemText>
                    {product.product.quantity} {product.product.name}: $
                    {product.product.price}
                  </ListItemText>
                  <Button
                    onClick={() => deleteCartItem(product.id, order)}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}>
                    Begone
                  </Button>
                </ListItem>
              ))}
              <ListItem style={{ alignItems: "flex-end" }}>
                <ListItemText>Total: ${order.total}</ListItemText>
              </ListItem>
              <Button variant="contained">Complete Order</Button>
              <Button
                variant="contained"
                onClick={() => handleCancelOrder(order.id)}>
                Cancel Order
              </Button>
            </List>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default OrderDetail;
