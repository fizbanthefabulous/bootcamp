import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Restaurant from './Restaurant/Restaurant';

const Home = (props) => {
    console.log("RestaurantList = ", props.restaurantList);

    let restaurants = props.restaurantList.map((restaurant, idx) => <Restaurant restaurant={restaurant} key={idx}/>)


    return (
        <div>
            <Link className='btn btn-secondary' to='/restaurants/new'>New restaurant</Link>

            <table className="table table-bordered restaurant-table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Cuisine</th>
                        <th scope="col">Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    restaurantList: state.restaurants,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);