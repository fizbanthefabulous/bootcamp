import React, { Component } from 'react';
import CounterApp from './components/Counter/CounterApp';
import TaskApp from './components/dojo-todos/TaskApp';
import Home from './components/Home/Home';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="navbar">
            <ul className="nav">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/counterapp">Counter App</Link></li>
              <li><Link to="/dojotodos">Dojo Todos</Link></li>
            </ul>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/counterapp" component={CounterApp} />
            <Route path="/dojotodos" component={TaskApp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
