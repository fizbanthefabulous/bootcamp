import React from 'react';
import './ProductList.css';
import { connect } from 'react-redux';
import { updateCurrentPage } from '../../store/redux';
import Product from './Product/Product';
import { CSSTransitionGroup } from 'react-transition-group';
//import { TransitionGroup, CSSTransition } from "react-transition-group";

const ProductList = (props) => {
    if (props.page !== 'products')
        props.updateCurrentPage('products');

    let productList = props.products.map((product, idx) => <Product product={product} key={idx} />)

    return (
        <div>
            <CSSTransitionGroup
                className="product-list"
                transitionName="product"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                {productList}
            </CSSTransitionGroup>
        </div>
    )
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
    page: state.page,
    products: state.products,
})

const mapDispatchToProps = (dispatch) => ({
    updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);