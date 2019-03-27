import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import DiyRouter from "./components/DiyRouter"

class App extends Component {
  render() {
    return (
      <div className="App">
        <DiyRouter />
      </div>
    )
  }
}

export default App
