import React from 'react';
import { withRouter } from 'react-router-dom';
import './CreateProduct.css';

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            price: null,
            url: null,
            titleError: true,
            priceError: true,
            canCreate: false,
        }
    }

    handleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let priceError = this.state.priceError;
        let titleError = this.state.titleError;
        let canCreate = false;

        if(id === "title") {
            if(value.length >= 4)
                titleError = false;
            else
                titleError = true;
        }
        else if(id === "price") {
            if(value.trim() !== "")
                priceError = false;
            else
                priceError = true;
        }
        
        if(!priceError && !titleError)        
            canCreate = true;
        
        this.setState({
            [id]: value,
            priceError,
            titleError,
            canCreate,
        })
    }

    createNewProduct = (e) => {
        e.preventDefault();
        console.log("creating new product");

        this.props.addProductFunc({title: this.state.title, price: this.state.price, url: this.state.url}, this.redirect);
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
                <form onSubmit={this.createNewProduct}>
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

                    <button type="submit" disabled={!this.state.canCreate} className="btn btn-success">Create</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateProduct);
