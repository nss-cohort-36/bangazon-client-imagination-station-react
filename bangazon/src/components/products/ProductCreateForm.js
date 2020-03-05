import APIManager from '../../modules/APIManager'
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AttachMoney from '@material-ui/icons/AttachMoney';
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import './Product.css'
// Author: Lauren Riddle
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
        width: 200,
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
        // imageFile: [],
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

    saveProduct = evt => {
        evt.preventDefault()

        // this.startUploadManually()

        const product = {
            name: this.state.Name,
            description: this.state.Description,
            price: this.state.Price,
            quantity: Number(this.state.Quantity),
            location: this.state.Location,
            image_path: this.state.ImagePath,
            product_type_id: Number(this.state.ProductTypeId)
        }

        if (this.state.Name !== "" && this.state.Quantity !== null && this.state.Price !== null && this.state.ProductTypeId !== null) {
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
            } else if (this.state.Quantity === null) {
                alert('Please input a quantity.')
            } else if (this.state.Price === null) {
                alert('Please input a price.')
            } else if (this.state.ProductTypeId === null) {
                alert('Please select a product type.')
            }
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

    // // Store selected file in the state
    // customOnChangeHandler = event => {
    //   const { files } = event.target;
    //   this.setState({ imageFile: files });
    // }

    // // Start download handler using the file uploader reference
    // startUploadManually = () => {
    //   const { imageFile } = this.state;
    //   this.handleUploadSuccess(imageFile);
    // }

    render() {
        const { classes } = this.props;
        const { ImagePath } = this.state;

        return (
            <>
                <div className="new-product-form-container">
                    <h2>Sell a Product</h2>

                    <form >
                        <form>
                          {ImagePath && <img className="preview" src={ImagePath} />}
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
                        </form>
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
                            label="Location"
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