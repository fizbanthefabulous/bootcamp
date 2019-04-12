import React from 'react';
import './RestaurantReviews.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Review from './Review/Review';

const RestaurantReviews = (props) => {
    console.log("RestaurantList = ", props.restaurantList);

    //let restaurants = props.restaurantList.map((restaurant, idx) => <Review restaurant={restaurant} key={idx} />)
    let restaurantIdx = props.restaurantList.findIndex((restaurant) => restaurant.id === props.match.params.id);

    if (restaurantIdx === -1) {
        return <Redirect to='/restaurants' />;
    }
    else {

        let restaurant = props.restaurantList[restaurantIdx];
        let reviews = props.reviewList.filter((review) => review.restaurantId === restaurant.id);
        reviews = reviews.sort((a, b) => b.stars - a.stars);
        reviews = reviews.map((review, idx) => <Review review={review} key={idx} />)

        console.log('Restaurant = ', restaurant);
        console.log('Reviews = ', reviews);

        return (
            <div>
                <h6>Reviews for {restaurant.name}</h6>
                <Link className='btn btn-secondary' to={`/restaurants/${restaurant.id}/review`} >New review</Link>

                <table className="table table-bordered restaurant-table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Stars</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews}
                    </tbody>
                </table>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    restaurantList: state.restaurants,
    reviewList: state.reviews,
    send: state.socketSendFunc,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RestaurantReviews);