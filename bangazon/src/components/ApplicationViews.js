import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ProductCreateForm from "./products/ProductCreateForm";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { isAuthenticated } from "../modules/simpleAuth"
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
                        if (isAuthenticated()) {
                            return <Redirect to='/' />
                        } else {
                            return <Login
                                {...props} {...this.props} loggedIn={this.props.loggedIn}/>
                        }
                    }}
                />
                <Route
                    exact path="/Register" render={props => {
                        if (isAuthenticated()) {
                            return <Redirect to='/' />
                        } else {
                            return <Register
                                {...props} {...this.props} loggedIn={this.props.loggedIn}/>
                        }

                    }}
                />


                <Route path="/product/new" render={(props) => {

                    if (isAuthenticated()) {
                        return <ProductCreateForm {...props} {...this.props} />
                    } else {
                        return <Redirect to='/login' />
                    }
                }
                } />

                <Route exact
                    path="/product/:productId(\d+)" render={props => {

                        //     if (isAuthenticated()) {
                        //       return <ProductDetail {...props} {...this.props} />
                        // } else {
                        //     return <Redirect to='/login' />
                        // }
                    }}
                />
                <Route
                    exact path="/products" render={props => {
                        // if (isAuthenticated()) {
                        //     return <ProductList {...props} {...this.props} />
                        // } else {
                        //     return <Redirect to='/login' />
                        // }
                    }}
                />
                <Route
                    exact path="/" render={props => {
                        if (isAuthenticated()) {
                            return <ProductCreateForm {...props} {...this.props} />
                        } else {
                            return <Redirect to='/login' />
                        }
                    }}
                />
                <Route
                    exact path="/payment/new" render={props => {
                        // if (isAuthenticated()) {
                        // return <PaymentCreateForm {...props} {...this.props} />
                        // } else {
                        //     return <Redirect to='/login' />
                        // }
                    }}
                />

                <Route
                    path="/order" render={(props, link) => {
                        // if (isAuthenticated()) {
                        // return <OrderDetail {...props} {...this.props} {...link} />
                        // } else {
                        //     return <Redirect to='/login' />
                        // }
                    }}
                />

                <Route
                    path="/profile" render={(props, link) => {
                        // if (isAuthenticated()) {
                        // return <Profile {...props} {...this.props} {...link} />
                        // } else {
                        //     return <Redirect to='/login' />
                        // }
                    }}
                />

            </React.Fragment>
        );
    }
}