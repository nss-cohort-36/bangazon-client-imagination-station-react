import React, { Component } from 'react';
import { Link } from "react-router-dom";

//CARDS
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./Product.css"

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
  
class SearchCard extends Component {

    render() {

        return (
            <Card className="product-list-card home-card">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        <Link to={`/Product/${this.props.product.id}`} className="product-link">{this.props.name}</Link>
                    </Typography>
                    <Typography color="textSecondary">
                        Price: ${this.props.price}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}
export default withStyles(styles)(SearchCard);