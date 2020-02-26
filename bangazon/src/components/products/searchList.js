import React, { Component } from 'react'
import SearchCard from "./searchCard"

class SearchList extends Component {


    render() {

        // console.log(this.props.searchResults, 'search results')

        return (
            <div>
            {this.props.searchResults.map(product =>
              <SearchCard
                key={product.id}
                product={product}
                name={product.name}
                price={product.price}
              />
            )}
          </div>
        )
    }

}

export default SearchList