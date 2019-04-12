import React from 'react';
import './AddReview.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AddReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: null,
            restaurantName: null,
            name: '',
            stars: 1,
            review: '',
            nameErr: true,
            reviewErr: true,
            canSubmit: false,
        }
    }

    componentDidMount() {
        let restaurantIdx = this.props.restaurantList.findIndex((restaurant) => restaurant.id === this.props.match.params.id);

        if (restaurantIdx > -1) {
            let restaurant = this.props.restaurantList[restaurantIdx];

            this.setState({
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
            })
        }
    }

    validateInputs = () => {
        let reviewErr = true;
        let nameErr = true;
        let canSubmit = false;

        if (this.state.name.trim().length > 2)
            nameErr = false;

        if (this.state.review.trim().length > 2)
            reviewErr = false;

        if (!nameErr && !reviewErr)
            canSubmit = true;

        this.setState({
            nameErr,
            reviewErr,
            canSubmit,
        })
    }

    handleChange = (event) => {
        let value = event.target.value;

        if(event.target.id === 'stars')
            value = parseInt(value[0]);

        this.setState({
            [event.target.id]: value,
        }, () => this.validateInputs())
    }

    addReview = (event) => {
        event.preventDefault();

        console.log('Adding a review!');

        this.props.send('add-reivew', {restaurantId: this.state.restaurantId, name: this.state.name, review: this.state.review, stars: this.state.stars});
        this.props.history.push(`/restaurants/${this.state.restaurantId}`);
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <h6>Write a review for {this.state.restaurantName}</h6>
                <form className='review-form' onSubmit={(event) => this.addReview(event)}>
                    <label htmlFor='name'>Your name:</label>
                    <br />
                    <input type='text' id='name' name='name' className='review-form-input' onChange={(event) => this.handleChange(event)} />
                    {this.state.nameErr ?
                        <small id="nameErr" className="form-text">Your name must be at least three characters long.</small>
                        :
                        <small>{/*Holding space for formating reasons*/}</small>
                    }

                    <label htmlFor='stars'>Stars:</label>
                    <br />
                    <select id='stars' name='stars' className='review-form-input' onChange={(event) => this.handleChange(event)}>
                        <option id="1">1 star</option>
                        <option id="2">2 star</option>
                        <option id="3">3 star</option>
                        <option id="4">4 star</option>
                        <option id="5">5 star</option>
                    </select>

                    <label htmlFor='review'>Review:</label>
                    <br />
                    <input type='text' id='review' name='review' className='restaurant-form-input' onChange={(event) => this.handleChange(event)} />
                    {this.state.reviewErr ?
                        <small id="reviewErr" className="form-text">Cuisine must be at least three characters long.</small>
                        :
                        <small>{/*Holding space for formating reasons*/}</small>
                    }

                    <div className='restaurant-form-btns'>
                        <Link to={`/restaurants/${this.state.restaurantId}`} id='cancel' className='btn btn-light restaurant-form-btn'>Cancel</Link>
                        <button type='submit' disabled={!this.state.canSubmit} id='submit' className='btn btn-primary restaurant-form-btn'>Submit</button>
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
)(AddReview);