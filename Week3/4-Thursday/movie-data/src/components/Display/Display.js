import React from 'react';
import './Display.css';

const Display = (props) => {
  console.log(props);

  return (

    <div className="movieDisplay">
      {props.movie != null ?
        <div>
          <div className="year">Year: {props.movie.Year}</div>
          <img src={props.movie.Poster} alt={props.movie.Title} />
        </div>
        : null
      }
    </div>
  );

}

export default Display;
