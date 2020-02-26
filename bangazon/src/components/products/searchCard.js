import React, { Component } from 'react';
import { Link } from "react-router-dom"

class SearchCard extends Component {

    render() {

        return (<p>Name: <Link to={`/Product/${this.props.product.id}`}>{this.props.name}</Link> Price: ${this.props.price}</p>)
   
}
}
export default SearchCard