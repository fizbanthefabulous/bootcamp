import React from 'react';
import './Restaurant.css';
import { Link } from 'react-router-dom';

const Restaurant = (props) => {
    console.log("Restaurant = ", props);

    return (
        <tr>
            <td>{props.restaurant.name}</td>
            <td>{props.restaurant.cuisine}</td>
            <td>
                <Link to={`/restaurants/${props.restaurant.id}`} className='btn btn-dark restaurant-btn'>Read Reviews</Link>
                <Link to={`/restaurants/${props.restaurant.id}/edit`} className='btn btn-success restaurant-btn'>Update</Link>
                <button className='btn btn-danger restaurant-btn'>Delete</button>
            </td>
        </tr>
    )
}

export default Restaurant;