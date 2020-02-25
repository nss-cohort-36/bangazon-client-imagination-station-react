import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ProductCreateForm from "./products/ProductCreateForm";
// import ProductDetail from './products/ProductDetails'
// import ProductList from './products/ProductList'
// import Home from './home/Home'
// import PaymentCreateForm from './payment/PaymentCreateForm'
// import OrderDetail from './orders/OrderDetail'
// import Profile from './myAccount/Profile'
export default class ApplicationViews extends Component {

    render() {
        return (
            <React.Fragment>


                <Route
                    exact path="/login" render={props => {

                        return <LogIn
                            {...props} {...this.props} />

                    }}
                />
                <Route
                    exact path="/Register" render={props => {

                        return <Register
                            {...props} {...this.props} />

                    }}
                />


                <Route path="/product/new" render={(props) => {

                    return <ProductCreateForm {...props} {...this.props} />

                }} />

                <Route exact
                    path="/product/:productId(\d+)" render={props => {


                        //   return <ProductDetail {...props} {...this.props} />

                    }}
                />
                <Route
                    exact path="/products" render={props => {
                        //   return <ProductList {...props} {...this.props} />

                    }}
                />
                <Route
                    exact path="/" render={props => {
                        // return <Home {...props} {...this.props} />

                    }}
                />
                <Route
                    exact path="/payment/new" render={props => {
                        // return <PaymentCreateForm {...props} {...this.props} />
                        
                    }}
                />

                <Route
                    path="/order" render={(props, link) => {
                        // return <OrderDetail {...props} {...this.props} {...link} />
                        
                    }}
                />

                <Route
                    path="/profile" render={(props, link) => {
                            // return <Profile {...props} {...this.props} {...link} />
                       
                    }}
                />

            </React.Fragment>
        );
    }
}