import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./Product.css"
import ProductApiManager from '../../modules/ProductApiManager'


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

function MyProductCard(props) {
  const { classes } = props;
  
  const [totalSold, setTotalSold] = useState(0)

  useEffect(() => {
    const getTotalSold = async () => {
      const response = await ProductApiManager.getTotalSold(props.myProductCard.id)
      setTotalSold(response.total_sold)
    }
    getTotalSold()
  }, [])


  return (
    <Card className={classes.card} id="my-product-card">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Product Type: {props.myProductCard.product_type.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.myProductCard.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ${props.myProductCard.price}  
        </Typography>
        <Typography component="p">
          Current Inventory: {props.myProductCard.quantity}
          <br />
          Number Sold: {totalSold}
          <br />
          Location: {props.myProductCard.location}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Description: {props.myProductCard.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          variant="contained" 
          color="secondary" 
          className={classes.button}
          onClick={() => props.deleteProduct(props.myProductCard.id)}
        >Delete
        </Button>
      </CardActions>
    </Card>
  );
}

MyProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProductCard);


