import React, { Component } from 'react';
import './App.css';
import CoinContainer from './components/CoinContainer/CoinContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CoinContainer />
      </div>
    );
  }
}

export default App;
