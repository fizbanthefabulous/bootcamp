import React from 'react';
import './EditProduct.css';
import { connect } from 'react-redux';
import { updateCurrentPage } from '../../store/redux';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            url: '',
            id: null,

            titleErr: true,
            priceErr: true,
            canCreate: false,
        }
    }

    componentDidMount() {
        if (this.props.page !== 'products/edit')
            this.props.updateCurrentPage('products/edit');

        console.log(this.props);
        let idx = this.props.products.findIndex((product) => product.id === this.props.match.params.id);

        console.log('IDX: ',idx);

        this.setState({
            title: this.props.products[idx].title,
            price: this.props.products[idx].price,
            url: this.props.products[idx].url,
            id: this.props.products[idx].id,
        }, () => this.validateInputs())
    }

    validateInputs = () => {
        let title = this.state.title;
        let price = this.state.price;
        
        let titleErr = this.state.titleErr;
        let priceErr = this.state.priceErr;
        let canCreate = false;

        if (title.trim().length > 3)
            titleErr = false;
        else
            titleErr = true;

        if (price !== '')
            priceErr = false;
        else
            priceErr = true;

        if (!titleErr && !priceErr)
            canCreate = true;

            this.setState({
                titleErr,
                priceErr,
                canCreate,
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        }, () => this.validateInputs())
    }


    editProduct = (event) => {
        event.preventDefault();
        console.log("Editing the Product");
        this.props.send('update-item', {id: this.state.id, title: this.state.title, price: this.state.price, url: this.state.url});
        this.props.history.push('/products');
    }

    deleteProduct = (event) => {
        event.preventDefault();
        console.log("Deleting the Product");
        this.props.send('delete-item', {id: this.state.id});
        this.props.history.push('/products');
    }


    render() {
        console.log("Rendering EditProduct");
        console.log(this.state);

        return (
            <div className="ppm-create-page">
                <h1>Create a New Product</h1>
                <form className='ppm-create-form' onSubmit={(event) => this.editProduct(event)}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text"
                            className="form-control"
                            id="title"
                            aria-describedby="titleErr"
                            placeholder="Required"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.title} />
                        {this.state.titleErr ?
                            <small id="titleErr" className="form-text ppm-err">Title must be at least four characters long.</small>
                            :
                            null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text"
                            className="form-control"
                            id="price"
                            placeholder="Required"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.price} />
                        {this.state.priceErr ?
                            <small id="priceErr" className="form-text ppm-err">Product must have a price.</small>
                            :
                            null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="url"
                            placeholder="Optional"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.url}
                        />
                    </div>
                    <button onClick={(event) => this.deleteProduct(event)} className="btn btn-danger ppm-edit-button">Delete</button>
                    <button disabled={!this.state.canCreate} type="submit" className="btn btn-warning ppm-edit-button">Edit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
    page: state.page,
    products: state.products
})

const mapDispatchToProps = (dispatch) => ({
    updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProduct);