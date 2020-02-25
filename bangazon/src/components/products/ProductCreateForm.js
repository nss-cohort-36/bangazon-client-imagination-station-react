import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'


class ProductCreateForm extends Component {

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
    componentDidMount(){
        // Gets all product types, then sets them in state to load the dropdown later
        APIManager.get("producttypes")
        .then((response) => {
            this.setState({
                producttypes: response
            })
        })
    }

    saveProduct = evt => {
        evt.preventDefault()
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
        APIManager.post("products/", product)
            .then((response) => {
                console.log(response)
                this.props.history.push(`/product/${response.id}`)
            })
        } else {

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

    render() {
        return (
            <>
                <div>
                    <h3>Sell a Product</h3>

                    <form>
                        <input type="text" placeholder="Enter Product Name" id="Name" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Description" type="text" id="Description" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Quantity" type="number" id="Quantity" onChange={this.handleFieldChange} />

                        <span>If local delivery is available, please specify a city below.</span>
                        <input placeholder="Enter Location" type="text" id="Location" onChange={this.handleFieldChange} />

                        <input placeholder="Enter Price" type="number" id="Price" onChange={this.handleFieldChange} />


                        <select id="ProductTypeId" onChange={this.handleFieldChange}>
                                <option value="">Select a Product Type</option>

                                {this.state.producttypes.map((product) => {
                                    return <option key={product.id} value={product.id} >{product.name}</option>
                                })}
                            </select>
                        <button
                            variant="light"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.saveProduct}
                        >Sell</button>
                    </form>
                </div>
            </>
        );
    }
}

export default ProductCreateForm