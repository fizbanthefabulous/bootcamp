import React from 'react';
import './Review.css';

const Review = (props) => {
    console.log("Review = ", props);

    return (
        <tr>
            <td>{props.review.name}</td>
            <td>{props.review.stars}</td>
            <td>{props.review.review}</td>
        </tr>
    )
}

export default Review;