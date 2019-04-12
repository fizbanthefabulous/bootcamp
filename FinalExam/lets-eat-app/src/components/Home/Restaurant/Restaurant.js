import React from 'react';
import './Restaurant.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {editRestaurant} from '../../../store/redux';

const Restaurant = (props) => {
    console.log("Restaurant = ", props);

    function deleteRestaurant(event) {
        props.send('delete-restaurant',{id: props.restaurant.id});
    }

    function editRes(event) {
        props.editRestaurant(props.restaurant.id);
    }

    if(props.restaurant.canDelete)
        setTimeout(() => props.send('edit-restaurant', {id: props.restaurant.id, canDelete: false}), 30000)

    return (
        <tr>
            <td>{props.restaurant.name}</td>
            <td>{props.restaurant.cuisine}</td>
            <td>
                <Link to={`/restaurants/${props.restaurant.id}`} className='btn btn-dark restaurant-btn'>Read Reviews</Link>
                {/* <Link to={`/restaurants/${props.restaurant.id}/edit`} className='btn btn-success restaurant-btn'>Update</Link> */}
                <button className='btn btn-success restaurant-btn' onClick={(event) => editRes(event)}>Update</button>
                <button disabled={!props.restaurant.canDelete} className='btn btn-danger restaurant-btn' onClick={(event) => deleteRestaurant(event)}>Delete</button>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({
    send: state.socketSendFunc,
})

const mapDispatchToProps = (dispatch) => ({
    editRestaurant: (id) => dispatch(editRestaurant(id)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Restaurant);