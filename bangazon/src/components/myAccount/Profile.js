import APIManager from '../../modules/APIManager'
import React, { Component } from 'react'


class Profile extends Component {

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
        APIManager.get("producttypes")
            .then((response) => {
                this.setState({
                    producttypes: response
                })
            })
    }
  

    // saveProduct = evt => {
    //     evt.preventDefault()
    //     const product = {
    //         name: this.state.Name,
    //         description: this.state.Description,
    //         price: this.state.Price,
    //         quantity: Number(this.state.Quantity),
    //         location: this.state.Location,
    //         image_path: this.state.ImagePath,
    //         product_type_id: Number(this.state.ProductTypeId)
    //     }

    //     if (this.state.Name !== "" && this.state.Quantity !== null && this.state.Price !== null && this.state.ProductTypeId !== null) {
    //         // Make a post with the product to the API
    //         APIManager.post("products/", product)
    //             .then((response) => {
    //                 // pushes you to product detail for the product just created
    //                 this.props.history.push(`/product/${response.id}`)
    //             })
    //     } else {
    //         // renders and alert based on what is missing from the product form
    //         if (this.state.Name === "") {
    //             alert('Please input a product name.')
    //         } else if (this.state.Quantity === null) {
    //             alert('Please input a quantity.')
    //         } else if (this.state.Price === null) {
    //             alert('Please input a price.')
    //         } else if (this.state.ProductTypeId === null) {
    //             alert('Please select a product type.')
    //         }
    //     }
    // }

    render() {

        return (
            <>
                <div className="profile-container">

                    
                </div>
            </>
        );
    }
}

export default Profile