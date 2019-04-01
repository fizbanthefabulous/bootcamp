import React from 'react';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import axios from 'axios';
import CreateProduct from '../CreateProduct/CreateProduct';
import ProductList from '../ProductList/ProductList';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './AppContainer.css';
import EditProduct from '../EditProduct/EditProduct';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4200/products")
        .then((response) => {
            this.setState({
                products: response.data,
            })
        })
    }

    addProduct = (product) => {
        console.log("adding a product");

        axios.post("http://localhost:4200/products", product)
        .then((response) => {
            this.setState({
                products: [...this.state.products, response.data],
            }, () => {
                console.log("returning");
                return true;
            })
        })
    }

    editProduct = (product) => {
        console.log("editing product id = ", product.id);
        axios.put(`http://localhost:4200/products/${product.id}`, {title: product.title, price: product.price, url: product.url})
        .then((response) => {
            this.setState({
                products: response.data,
            })
        })
    }

    deleteProduct = (id) => {
        console.log("Deleting product id = ",id);

        axios.delete(`http://localhost:4200/products/${id}`)
        .then((response) => {
            this.setState({
                products: response.data,
            })
        })
    }

    render() {
        console.log(this.state);
        return (
            <div className="AppContainer">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/home' />} />
                        <Route path='/home' component={Home} />
                        <Route exact path='/products' render={() => <ProductList products={this.state.products} deleteProductFunc={this.deleteProduct}/> } />
                        <Route path='/products/new' render={() => <CreateProduct addProductFunc={this.addProduct}/>} />
                        <Route path='/products/edit/:id' render={(props) => <EditProduct {...props} deleteProductFunc={this.deleteProduct} editProductFunc={this.editProduct} />}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default AppContainer;
