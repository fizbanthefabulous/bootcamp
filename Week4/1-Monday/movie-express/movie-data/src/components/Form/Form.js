import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
      super(props);
      
      this.state = {
        movie: '',
      }
  }
  

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  
    render() {
    return (
      <div className="form">
        <input type="text" name="movie" onChange={this.handleChange}/>
        <button onClick={() => this.props.searchFunc(this.state.movie)}>Search</button>
      </div>
    );
  }
}

export default Form;
