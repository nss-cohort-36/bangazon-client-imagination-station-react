import APIManager from '../../modules/APIManager'
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';
import firebase from "firebase/app";
import 'firebase/storage';
import FileUploader from "react-firebase-file-uploader";
import './Product.css'
// Author(s): Lauren Riddle, Ryan Crowley
// Purpose: To create form to making a new product
const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 400,
    },
});

const config = {
  apiKey: "AIzaSyAkfA7Spx0YUKiqGa_q9q_TqIeddkChjJM",
  authDomain: "bangazon-dd868.firebaseapp.com",
  databaseURL: "https://bangazon-dd868.firebaseio.com",
  projectId: "bangazon-dd868",
  storageBucket: "bangazon-dd868.appspot.com",
  messagingSenderId: "89180329262",
  appId: "1:89180329262:web:eeed075276edc6ace7d6bf"
};

firebase.initializeApp(config);

class ProductCreateForm extends React.Component {

    state = {
        Description: "",
        Name: "",
        Price: null,
        Quantity: null,
        Location: "",
        ImagePath: "./none_pic.jpg",
        ProductTypeId: null,
        producttypes: [],
        checkbox: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    componentDidMount() {
        // Gets all product types, then sets them in state to load the dropdown later
        APIManager.getAll("producttypes")
            .then((response) => {
                this.setState({
                    producttypes: response
                })
            })
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    isValid = (str) => {
        // Checks the string for the [!@#$%^&*()] characters and returns whether the string is valid or not
        return !/[!@#$%^&*()]/g.test(str);
    }

    saveProduct = evt => {
        evt.preventDefault()
        if (this.isValid(this.state.Name) && this.isValid(this.state.Description)) {


        const product = {
            name: this.state.Name,
            description: this.state.Description,
            price: this.state.Price,
            quantity: parseInt((this.state.Quantity)),
            location: this.state.Location,
            image_path: this.state.ImagePath,
            product_type_id: Number(this.state.ProductTypeId)
        }

        // Update price to be 2 digit float to match currency in dollars
        if (product.price) {
            let oldPrice = parseFloat(product.price)
            let newPrice = oldPrice.toFixed(2)
            product.price = newPrice
        }

        if (this.state.Name !== ""
            && this.state.Description !== ""
            // Check to make sure quantity is not a negative number or between 0 and 1
            && this.state.Quantity >= 0 && isNaN(product.quantity) !== true
            && this.state.Description !== ""
            // Check to make sure the price is not negative and less than 10,000
            && this.state.Price >= 0 && this.state.Price <= 10000
            && this.state.ProductTypeId !== null
        ) {
            // Make a post with the product to the API
            APIManager.post("products", product)
                .then((response) => {
                    // pushes you to product detail for the product just created
                    this.props.history.push(`/product/${response.id}`)
                })
        } else {
            // renders and alert based on what is missing from the product form
            if (this.state.Name === "") {
                alert('Please input a product name.')
            } else if (this.state.Description === "") {
                alert('Please input a description.')
            } else if (this.state.Quantity === null || isNaN(product.quantity)) {
                alert('Please input a quantity.')
            } else if (this.state.Quantity < 0) {
                alert('You cannot have a negative quantity number.')
            } else if (this.state.Price === null || this.state.Price === "") {
                alert('Please input a price.')
            } else if (this.state.Price < 0) {
                alert('You cannot have a negative price.')
            } else if (this.state.Price > 10000) {
                alert('The maximum price is $10,000.')
            } else if (this.state.ProductTypeId === null) {
                alert('Please select a product type.')
            }
        }
    }
    else {
        alert('Please make sure that your title and description do not have !@#$%^&*() characters in them.')
    }
    }

    handleUploadSuccess = filename => {
      firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ ImagePath: url }));
    };


    render() {
        const { classes } = this.props;
        const { ImagePath } = this.state;

        return (
            <>
                <div className="new-product-form-container">
                    <h2>Sell a Product</h2>

                    <form className="new-product-form">
                        {ImagePath && <img style={{width: '100%', marginBottom: '20px'}} src={ImagePath} alt="img" />}
                        <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, display: 'block', borderRadius: 4, cursor: 'pointer'}}>
                            Upload Photo
                          <FileUploader
                            hidden
                            accept="image/*"
                            name="product"
                            randomizeFilename
                            storageRef={firebase.storage().ref("images")}
                            onUploadSuccess={this.handleUploadSuccess}
                            // onChange={this.customOnChangeHandler}
                            // ref={instance => { this.fileUploader = instance; } }
                          />
                        </label>
                        <TextField
                            id="outlined-name product"
                            label="Name"
                            className={classes.textField}
                            onChange={this.handleChange('Name')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name product"
                            label="Description"
                            className={classes.textField}
                            onChange={this.handleChange('Description')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-number product"
                            label="Quantity"
                            onChange={this.handleChange('Quantity')}
                            type="number"
                            className={classes.textField}

                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name product"
                            label="Location (if available for local pickup)"
                            className={classes.textField}
                            onChange={this.handleChange('Location')}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-number product"
                            label="Price"
                            onChange={this.handleChange('Price')}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-select-currency product"
                            select
                            label="Select"
                            className={classes.textField}
                            onChange={this.handleChange('ProductTypeId')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            helperText="Please select a product type"
                            margin="normal"
                            variant="outlined"
                        >
                            {this.state.producttypes.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Button variant="contained" color="secondary" className={classes.button} disabled={this.state.loadingStatus}
                            onClick={this.saveProduct}>
                            Sell
                            <AttachMoney className={classes.rightIcon} />
                        </Button>

                    </form>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(ProductCreateForm)