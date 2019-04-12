import React from 'react';
import './Author.css';
import { Link } from 'react-router-dom';

const Author = (props) => {


    return (
        <tr>
            <th scope="row">{props.author.name}</th>
            <td>
                <Link className='btn btn-success btn-authors' to={`/quotes/${props.author.id}`}>View Quotes</Link>
                <Link className='btn btn-success btn-authors' to={`/edit/${props.author.id}`}>Edit</Link>
            </td>
        </tr>
    )
}

export default Author;