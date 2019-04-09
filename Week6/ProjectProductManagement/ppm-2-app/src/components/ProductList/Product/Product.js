import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Product = (props) => {

    function deleteProduct(event) {
        event.preventDefault();
        console.log("Deleting the Product");
        props.send('delete-item', {id: props.product.id});
    }

    return (
        <div className="card ppm-product">
            <img src={props.product.url} className="card-img-top" alt={props.product.title}></img>
            <div className="card-body">
                <h5 className="card-title">{props.product.title}</h5>
                <p className="card-text">{props.product.price}</p>
                <Link to={`/products/edit/${props.product.id}`} className="btn btn-warning ppm-button">Edit</Link>
                <button className="btn btn-danger ppm-button" onClick={(event) => deleteProduct(event)}>Delete</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);