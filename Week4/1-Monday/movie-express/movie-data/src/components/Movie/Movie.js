import React from 'react';
import './Movie.css';

const Movie = (props) => {
  console.log(props);

  return (
    <li id={props.id}><i onClick={() => props.deleteFunc(props.id)} class="fas fa-trash-alt" /><span onClick={() => props.displayFunc(props.id)}>{props.title}</span></li>
  );

}

export default Movie;
