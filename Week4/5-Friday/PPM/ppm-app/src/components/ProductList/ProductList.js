import React from 'react';
import './ProductList.css';
import Product from "./Product/Product";

const ProductList = (props) => {
    let products = props.products.map((product, idx) => <Product key={idx} deleteFunc={props.deleteProductFunc} title={product.title} price={product.price} url={product.url} id={product.id}/> )

    return (
        <div className="ppm-product-list">
            {products.length > 0 ?
                <div className="ppm-product-list">
                    <h1>Products List</h1>
                    {products}
                </div>
                :
                <h3>Currently there are no products in the catalog</h3>
            }
        </div>
    )
}

export default ProductList;