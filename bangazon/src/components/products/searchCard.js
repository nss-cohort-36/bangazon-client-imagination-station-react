import React, { Component } from 'react';

class SearchCard extends Component {

    render() {
        return <p>Name: {this.props.name} Price: ${this.props.price}</p>
    }
}

export default SearchCard