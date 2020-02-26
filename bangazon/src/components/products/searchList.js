import React, { Component } from 'react'
import SearchCard from "./SearchCard"

class SearchList extends Component {


    render() {

        // console.log(this.props.searchResults, 'search results')

        return (
            <div>
            {this.props.searchResults.map(product =>
              <SearchCard
                key={product.id}
                name={product.name}
                price={product.price}
              />
            )}
          </div>
        )
    }

}

export default SearchList