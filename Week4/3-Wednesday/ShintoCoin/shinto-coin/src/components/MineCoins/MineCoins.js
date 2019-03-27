import React from 'react';
import './MineCoins.css';

class MineCoins extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            answer: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    mine = (e) => {
        e.preventDefault();

        this.props.mineFunc();
    }

    render() {
        return (
            <div id="mine">
                <h1>Mine ShintoCoins</h1>
                <p>Here you can mine ShintoCoins by answering the following question:</p>
                <p>Would you like a ShintoCoin?</p>
                <form id="mineForm" onSubmit={this.mine}>
                    <input type="text" id="answer" name="answer" onChange={this.handleChange}/>
                    <button id="mine" className="button">Mine</button>
                </form>
            </div>
        )
    }
}

export default MineCoins;