import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { initState, updateProducts } from '../../store/redux';
import Home from '../../components/Home/Home';
import Navbar from '../../components/Navbar/Navbar';
import ProductList from '../../components/ProductList/ProductList';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './AppContainer.css';
import CreateProduct from '../../components/CreateProduct/CreateProduct';
import EditProduct from '../../components/EditProduct/EditProduct';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.socket = io('http://localhost:4200');
    }

    componentDidMount = () => {
        this.socket.on('greeting', (data) => { //4
            console.log("CLIENT > socket.on greeting")
            console.log(data.msg); //5
            this.socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' });
        });

        //Initialize socket Listeners
        this.initProductListListener();

        this.props.initState(this.sendMsgToConnectedServer);
    }


    initProductListListener = () => {
        this.socket.on('newProductList', (products) => {
            console.log("New Product List: ", products);
            this.props.updateProducts(products.products);
        });
    }


    sendMsgToConnectedServer = (msgType, message) => {
        console.log(`Sending - action:${msgType} -- message:${message}`);
        this.socket.emit(msgType, message);
    }


    render() {
        return (
            <div className='app-container'>
            {
                this.props.ready ?
                <BrowserRouter>
                    <Navbar />

                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/home' />} />
                        <Route path='/home' component={Home} />
                        <Route exact path='/products' component={ProductList} />
                        <Route path='/products/new' component={CreateProduct} />
                        <Route path='/products/edit/:id' render={(props) => <EditProduct {...props} /> } />
                    </Switch>
                </BrowserRouter>

                :

                <h1>Loading...</h1>
            }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ready: state.ready,
})

const mapDispatchToProps = (dispatch) => ({
    updateProducts: (products) => dispatch(updateProducts(products)),
    initState: (socketSendFunc) => dispatch(initState(socketSendFunc)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);