import React from 'react';
import './EditRestaurant.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editRestaurant } from '../../store/redux';

class EditRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            cuisine: '',
            nameErr: true,
            nameErrMessage: 'Restaurant name must be at least three characters long.',
            cuisineErr: true,
            canSubmit: false,
        }
    }

    componentDidMount() {
        console.log(this.props);
        let restaurantIdx = this.props.restaurantList.findIndex((restaurant) => restaurant.id === this.props.id);

        if (restaurantIdx > -1) {
            let restaurant = this.props.restaurantList[restaurantIdx];

            console.log("Restaurant to Edit = ", restaurant);

            document.getElementById('name').value = restaurant.name;
            document.getElementById('cuisine').value = restaurant.cuisine;

            this.setState({
                id: restaurant.id,
                name: restaurant.name,
                cuisine: restaurant.cuisine,
            }, () => this.validateInputs())
        }
        else {
            this.props.history.push('/restaurants');
        }
    }

    validateInputs = () => {
        let cuisineErr = true;
        let nameErr = true;
        let canSubmit = false;
        let nameErrMessage = 'Restaurant name must be at least three characters long';

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
            nameErrMessage
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        }, () => this.validateInputs())
    }

    editRestaurant = (event) => {
        event.preventDefault();

        console.log('editing a restaurant!');

        let restaurantIdx = this.props.restaurantList.findIndex((restaurant) => restaurant.name.trim().toLowerCase() === this.state.name.trim().toLowerCase());

        if (restaurantIdx === -1) {
            this.props.send('edit-restaurant', { id: this.state.id, name: this.state.name, cuisine: this.state.cuisine });
            //this.props.history.push('/restaurants');
            this.props.editRestaurant(null);
        }
        else {
            this.setState({
                nameErr: true,
                nameErrMessage: 'Restaurant name already taken.'
            })
        }
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <h6>Edit a restaurant</h6>
                <form className='restaurant-form' onSubmit={(event) => this.editRestaurant(event)}>
                    <label htmlFor='restaurant-name'>Restaurant name:</label>
                    <br />
                    <input type='text' id='name' name='name' className='restaurant-form-input' onChange={(event) => this.handleChange(event)} />
                    {this.state.nameErr ?
                        <small id="nameErr" className="form-text">{this.state.nameErrMessage}</small>
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
                        <button type='submit' disabled={!this.state.canSubmit} id='edit' className='btn btn-primary restaurant-form-btn'>Edit</button>
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
    editRestaurant: (id) => dispatch(editRestaurant(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditRestaurant);