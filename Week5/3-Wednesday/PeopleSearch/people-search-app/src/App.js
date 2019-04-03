import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './containers/AppContainer/AppContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
