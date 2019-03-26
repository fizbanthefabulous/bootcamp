import React from 'react';
import Movie from './../Movie/Movie';
import './Display.css';

const Display = (props) => {
  console.log(props);

  var movies = props.history.sort((a,b) => {return b.id - a.id})
  movies = movies.map((movie, idx) => <Movie id={movie.id} title={movie.title} key={idx} deleteFunc={props.deleteFunc} displayFunc={props.displayFunc}/>)

  return (
    <div>
      <div className="movieDisplay">
        {props.movie != null ?
          <div>
            <div className="year">Year: {props.movie.year}</div>
            <img src={props.movie.poster} alt={props.movie.title} />
          </div>
          : null
        }
      </div>
      <div className="history">
        <h3>Lookup History</h3>
        <ul>
          {movies}
        </ul>
      </div>
      </div>
  );

}

export default Display;
