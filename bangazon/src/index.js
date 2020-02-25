import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App"
import Register from "../src/components/auth/Register"
import Login from "../src/components/auth/Login"
import ProductCreateForm from '../src/components/products/ProductCreateForm'

ReactDOM.render(<ProductCreateForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
