import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {


    return (
        <div className="card ppm-card">
            <img src={props.url} className="card-img-top" alt={`Product ${props.id}`} />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.price}</p>
                <Link to={`/products/edit/${props.id}`} className="btn btn-warning">Edit Product</Link>
                <button className="btn btn-danger" onClick={() => props.deleteFunc(props.id)}>Delete Product</button>
            </div>
        </div>

    )
}

export default Product;