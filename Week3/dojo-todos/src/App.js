import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TaskApp from './components/TaskApp.js';

class App extends Component {
  render() {
    return (
      <div className="App">
          <TaskApp />
      </div>
    );
  }
}

export default App;
