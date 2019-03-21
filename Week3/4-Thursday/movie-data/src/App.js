import React, { Component } from 'react';
import MovieData from './components/MovieData/MovieData';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MovieData />
      </div>
    );
  }
}

export default App;
