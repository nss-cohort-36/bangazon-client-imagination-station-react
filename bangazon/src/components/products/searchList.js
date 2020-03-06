import React, { Component } from 'react'
import SearchCard from "./searchCard"
import "./Product.css"

class SearchList extends Component {


  render() {


    return (
      <>

      {this.props.searchResults.length !== 0 ? <h1 className="search-results-header">Search Results:</h1> : <h1 className="search-results-header-no">No Search Results</h1>}
        {this.props.searchResults.map(product =>
          <SearchCard
            key={product.id}
            product={product}
            name={product.name}
            price={product.price}
            imagePath={product.image_path}
          />
        )}
      </>

    )
  }

}

export default SearchList

