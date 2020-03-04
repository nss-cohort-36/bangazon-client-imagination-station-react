import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import ProductCreateForm from "./products/ProductCreateForm";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetail from './products/ProductDetails'
import { isAuthenticated } from "../modules/simpleAuth";
import OrderDetail from "./orders/OrderDetail";
import SearchList from "./products/searchList"
// import ProductDetail from './products/ProductDetails'
import MyProductList from './products/MyProductList'
import Home from './home/Home'
import PaymentCreateForm from './payment/PaymentCreateForm'
// import OrderDetail from './orders/OrderDetail'
import Profile from './myAccount/Profile'
import CompleteOrder from './orders/CompleteOrder'
import ThankYou from "./orders/ThankYou"
import ProfileEditForm from "./myAccount/profileEditForm"
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
                {...props} {...this.props} loggedIn={this.props.loggedIn} />
            }
          }}
        />
        <Route
          exact path="/Register" render={props => {
            if (isAuthenticated()) {
              return <Redirect to='/' />
            } else {
              return <Register
                {...props} {...this.props} loggedIn={this.props.loggedIn} />
            }

          }}
        />

        <Route
          exact path="/SearchResults" render={props => {
            if (isAuthenticated()) {
              return <SearchList {...props} {...this.props} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />


        <Route
          path="/product/new"
          render={props => {
            if (isAuthenticated()) {
              return <ProductCreateForm {...props} {...this.props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
        exact
          path="/profile"
          render={props => {
            if (isAuthenticated()) {
              return <Profile {...props} {...this.props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
         <Route
          exact path="/profile/update"
          render={props => {
            if (isAuthenticated()) {
              return <ProfileEditForm {...props} {...this.props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />


        <Route
          exact
          path="/payment/new"
          render={props => {
            if (isAuthenticated()) {
              return <PaymentCreateForm {...props} {...this.props} />
            } else {
              return <Redirect to='/login' />
            }
          }}
        />

        <Route exact
          path="/product/:productId(\d+)" render={props => {
            if (isAuthenticated()) {
              return <ProductDetail
                {...props}
                {...this.props}
                productId={props.match.params.productId}
              />
            } else {
              return <Redirect to='/login' />
            }
          }}
        />
        <Route
          exact path="/products" render={props => {
            if (isAuthenticated()) {
              return <MyProductList {...props} {...this.props} />
            } else {
              return <Redirect to='/login' />
            }
          }}
        />

        <Route
          exact path="/" render={props => {
            if (isAuthenticated()) {
                return <Home {...props} {...this.props} />
            } else {
                return <Redirect to='/login' />
            }
          }}
        />


        <Route
          path="/order"
          render={(props, link) => {
            if (isAuthenticated()) {
              return <OrderDetail {...props} {...this.props} {...link} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route exact
          path="/completeorder/:orderId(\d+)"
          render={(props, link) => {
            if (isAuthenticated()) {
              return <CompleteOrder {...props} {...this.props} {...link} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <Route exact
          path="/thankyou"
          render={(props) => {
            if (isAuthenticated()) {
              return <ThankYou {...props} {...this.props} />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
      </React.Fragment>
    );
  }
}

