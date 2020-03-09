import React, { Component } from 'react'
import SearchCard from "./searchCard"
import "./Product.css"
import "../home/Home.css"

class SearchList extends Component {


  render() {


    return (
      <>
        {this.props.searchResults.length !== 0 ? <h1 className="search-results-header">Search Results:</h1> : <h1 className="search-results-header-no">No Search Results</h1>}
        <section className="products-home-container">
          {this.props.searchResults.map(product =>
            <SearchCard
              key={product.id}
              product={product}
              name={product.name}
              price={product.price}
              imagePath={product.image_path}
            />
          )}
        </section>
      </>

    )
  }

}

export default SearchList

