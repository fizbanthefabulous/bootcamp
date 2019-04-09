import React from 'react';
import './CreateProduct.css';
import { connect } from 'react-redux';
import { updateCurrentPage } from '../../store/redux';

class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            url: '',

            titleErr: true,
            priceErr: true,
            canCreate: false,
        }
    }

    componentDidMount() {
        if (this.props.page !== 'products/new')
            this.props.updateCurrentPage('products/new');
    }

    handleChange = (event) => {
        let titleErr = this.state.titleErr;
        let priceErr = this.state.priceErr;
        let canCreate = false;

        if (event.target.id === 'title') {
            if (event.target.value.trim().length > 3)
                titleErr = false;
            else
                titleErr = true;
        }

        if (event.target.id === 'price') {
            if (event.target.value.trim() !== '')
                priceErr = false;
            else
                priceErr = true;
        }

        if (!titleErr && !priceErr)
            canCreate = true;

        this.setState({
            [event.target.id]: event.target.value,
            titleErr,
            priceErr,
            canCreate,
        })
    }


    createNewProduct = (event) => {
        event.preventDefault();
        console.log("Creating a Product");
        this.props.send('create-new-item', {title: this.state.title, price: this.state.price, url: this.state.url});
        this.props.history.push('/products');
    }


    render() {
        console.log("Rendering CreateProduct");
        console.log(this.state);

        return (
            <div className="ppm-create-page">
                <h1>Create a New Product</h1>
                <form className='ppm-create-form' onSubmit={(event) => this.createNewProduct(event)}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" aria-describedby="titleErr" placeholder="Required" onChange={(event) => this.handleChange(event)} />
                        {this.state.titleErr ?
                            <small id="titleErr" className="form-text ppm-err">Title must be at least four characters long.</small>
                            :
                            null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="text" className="form-control" id="price" placeholder="Required" onChange={(event) => this.handleChange(event)} />
                        {this.state.priceErr ?
                            <small id="priceErr" className="form-text ppm-err">Product must have a price.</small>
                            :
                            null
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">Image URL</label>
                        <input type="text" className="form-control" id="url" placeholder="Optional" onChange={(event) => this.handleChange(event)} />
                    </div>
                    <button disabled={!this.state.canCreate} type="submit" className="btn btn-success">Create</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
    page: state.page,
})

const mapDispatchToProps = (dispatch) => ({
    updateCurrentPage: (page) => dispatch(updateCurrentPage(page)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProduct);