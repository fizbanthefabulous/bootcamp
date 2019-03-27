import React, { Component } from "react"

class CoffeeScript extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null
    }
  }

  componentDidMount() {
    this.setState({ timer: 5 })
    setTimeout(this.countDown, 1000)
  }

  countDown = () => {
    if (this.state.timer === 0) {
      this.props.reDirect()
    } else {
      this.setState({
        timer: this.state.timer - 1
      })
      setTimeout(this.countDown, 1000)
    }
  }

  render() {
    return (
      <div>
        <p>
          CoffeScript is a programming language that transcomplies to JavaScript, so we will be redirecting to JavaScript in{" "}
          {this.state.timer}.
        </p>
      </div>
    )
  }
}

export default CoffeeScript
