/*
author: Ken "Yeah, sorry, I broke that" Boyd
*/

import React, { useState, useEffect } from "react";
import APIManager from "../../modules/APIManager";
import "./Order.css";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItemText,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

//CARDS
import { withStyles } from "@material-ui/core/styles";
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

  return isLoading ? (
    <div>Loading, please wait</div>
  ) : (
    <Card>
      <CardContent>
        {/* <Container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}> */}
        <Typography variant="h5" component="h2">
          {orders.length > 1 ? "Open Orders" : "Open Order"}{" "}
        </Typography>
        <List>
          {orders.map(order => (
            <ListItem key={order.id}>
              <List
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   alignItems: "flex-end"
              // }}
              >
                <Typography
                // style={{ alignSelf: "center" }}
                >
                  Order #{order.id}
                </Typography>
                {order.products.map(product => (
                  <ListItem key={product.id}>
                    <ListItemText>
                      <Typography variant="h5" component="h2">
                        {product.product.name}:{" "}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        Quantity Available: {product.product.quantity}{" "}
                        <Button
                          onClick={() => deleteCartItem(product.id, order)}
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}>
                          Remove
                        </Button>
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        Price: ${product.product.price}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
                <ListItem style={{ alignItems: "flex-end" }}>
                  <ListItemText>
                    <Typography component="p">Total: ${order.total}</Typography>
                  </ListItemText>
                </ListItem>
                <CardActions>
                  <Button variant="contained">Complete Order</Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelOrder(order.id)}>
                    Cancel Order
                  </Button>
                </CardActions>
              </List>
            </ListItem>
          ))}
        </List>
        {/* </Container> */}
      </CardContent>
    </Card>
  );
};

export default OrderDetail;
