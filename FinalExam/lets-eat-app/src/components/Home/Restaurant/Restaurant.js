import React from 'react';
import './Restaurant.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Restaurant = (props) => {
    console.log("Restaurant = ", props);

    function deleteRestaurant(event) {
        props.send('delete-restaurant',{id: props.restaurant.id});
    }

    return (
        <tr>
            <td>{props.restaurant.name}</td>
            <td>{props.restaurant.cuisine}</td>
            <td>
                <Link to={`/restaurants/${props.restaurant.id}`} className='btn btn-dark restaurant-btn'>Read Reviews</Link>
                <Link to={`/restaurants/${props.restaurant.id}/edit`} className='btn btn-success restaurant-btn'>Update</Link>
                <button className='btn btn-danger restaurant-btn' onClick={(event) => deleteRestaurant(event)}>Delete</button>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
})

const mapDispatchToProps = (dispatch) => ({
    //No actions needed
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Restaurant);