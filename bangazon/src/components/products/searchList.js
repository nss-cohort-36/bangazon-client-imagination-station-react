import React, { Component } from 'react'
import SearchCard from "./searchCard"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class SearchList extends Component {


  render() {

    // console.log(this.props.searchResults, 'search results')

    return (
      <Card >
        <CardContent>
          {this.props.searchResults.map(product =>
            <SearchCard
              key={product.id}
              product={product}
              name={product.name}
              price={product.price}
            />
          )}
        </CardContent>

      </Card>
    )
  }

}

export default SearchList