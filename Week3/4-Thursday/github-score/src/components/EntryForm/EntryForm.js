import React, { Component } from 'react';
import './EntryForm.css';

class EntryForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            searchFunc: props.searchFunc,    
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    calculateScore = (event) => {
        event.preventDefault();
        console.log('Calculating');
        this.state.searchFunc(this.state.username);
    }


    render() {
        console.log(this.state);
        return (
            <form className="entryForm" onSubmit={this.calculateScore}>
                <h1>Github Score</h1>
                <label htmlFor="username" id="usernameLabel">Github Username: </label>
                <input type="text" placeholder="github_username" name="username" onChange={this.handleChange}/>
                <button name="calculate" id="calculate">Calculate my Github Score</button>
            </form>
        )
    }
}

export default EntryForm