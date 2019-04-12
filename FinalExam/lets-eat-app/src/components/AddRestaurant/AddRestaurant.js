import React from 'react';
import './AddRestaurant.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AddRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cuisine: '',
            nameErr: true,
            cuisineErr: true,
            canSubmit: false,
        }
    }

    validateInputs = () => {
        let cuisineErr = true;
        let nameErr = true;
        let canSubmit = false;

        if (this.state.name.trim().length > 2)
            nameErr = false;

        if (this.state.cuisine.trim().length > 2)
            cuisineErr = false;

        if (!nameErr && !cuisineErr)
            canSubmit = true;

        this.setState({
            nameErr,
            cuisineErr,
            canSubmit,
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        }, () => this.validateInputs())
    }

    addRestaurant = (event) => {
        event.preventDefault();

        console.log('Adding a restaurant!');

        let restaurantIdx = this.props.restaurantList.findIndex((restaurant) => restaurant.name.trim().toLowerCase() === this.state.name.trim().toLowerCase());

        if (restaurantIdx === -1) {
            this.props.send('add-restaurant', { name: this.state.name, cuisine: this.state.cuisine });
            this.props.history.push('/restaurants');
        }
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <h6>Register a restaurant</h6>
                <form className='restaurant-form' onSubmit={(event) => this.addRestaurant(event)}>
                    <label htmlFor='restaurant-name'>Restaurant name:</label>
                    <br />
                    <input type='text' id='name' name='name' className='restaurant-form-input' onChange={(event) => this.handleChange(event)} />
                    {this.state.nameErr ?
                        <small id="nameErr" className="form-text">Restaurant name must be at least three characters long.</small>
                        :
                        <small>{/*Holding space for formating reasons*/}</small>
                    }

                    <label htmlFor='cuisine'>Cuisine:</label>
                    <br />
                    <input type='text' id='cuisine' name='cuisine' className='restaurant-form-input' onChange={(event) => this.handleChange(event)} />
                    {this.state.cuisineErr ?
                        <small id="cuisineErr" className="form-text">Cuisine must be at least three characters long.</small>
                        :
                        <small>{/*Holding space for formating reasons*/}</small>
                    }

                    <div className='restaurant-form-btns'>
                        <Link to='/restaurants' id='cancel' className='btn btn-light restaurant-form-btn'>Cancel</Link>
                        <button type='submit' disabled={!this.state.canSubmit} id='register' className='btn btn-primary restaurant-form-btn'>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
    restaurantList: state.restaurants,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddRestaurant);