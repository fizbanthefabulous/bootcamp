import React from 'react';
import { withRouter } from 'react-router-dom';
import './EditProduct.css';
import axios from 'axios';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            price: null,
            url: null,
            id: null,
            titleError: true,
            priceError: true,
            canEdit: false,
        }
    }

    componentDidMount() {
        console.log(this.props);

        axios.get(`http://localhost:4200/api/products/${this.props.match.params.id}`)
        .then((response) => {
            console.log(response.data);

            document.getElementById('title').value = response.data.title;
            document.getElementById('price').value = response.data.price;
            document.getElementById('url').value = response.data.url;

            this.setState({
                title: response.data.title,
                price: response.data.price,
                url: response.data.url,
                id: response.data.id,
            }, () => this.validateInputs())
        })
    }

    validateInputs = () => {
        let priceError = this.state.priceError;
        let titleError = this.state.titleError;
        let canEdit = false;

        if(this.state.title.length >= 4)
            titleError = false;
        else
            titleError = true;
    
        if(this.state.price.trim() !== "")
            priceError = false;
        else
            priceError = true;
        
        if(!priceError && !titleError)        
            canEdit = true;

        this.setState({
            priceError,
            titleError,
            canEdit,
        })
    }

    handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
       
        
        this.setState({
            [id]: value,
        }, () => this.validateInputs())
    }

    editProduct = (e) => {
        e.preventDefault();
        console.log("editing product");

        this.props.editProductFunc({title: this.state.title, price: this.state.price, url: this.state.url, id: this.state.id}, this.redirect);
    } 

    deleteProduct = (e) => {
        e.preventDefault();

        this.props.deleteProductFunc(this.state.id, this.redirect);
    }

    redirect = () => {
        console.log("redirect");
        this.props.history.push('/products');
    }

    render() {
        console.log(this.state);
        return (
            <div className="ppm-form">
                <h1>Create a New Product</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            aria-describedby="titleErr"
                            placeholder="Required" 
                            onChange={(e) => this.handleChange(e)}    
                        />
                        {this.state.titleError ? 
                            <small 
                                id="titleErr" 
                                className="form-text ppm-val-mess"
                            >
                               Title must be at least four characters long.
                            </small> 
                            : null
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            aria-describedby="priceErr"
                            id="price"
                            placeholder="Required" 
                            onChange={(e) => this.handleChange(e)}
                        />
                         {this.state.priceError ? 
                            <small 
                                id="priceErr" 
                                className="form-text ppm-val-mess"
                            >
                                You must enter a price.
                            </small> 
                            : null
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="url"
                            placeholder="Optional" 
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <button onClick={this.deleteProduct} className="btn btn-danger">Delete Product</button>
                    <button onClick={this.editProduct} disabled={!this.state.canEdit} className="btn btn-primary">Edit Product</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EditProduct);
