import React from 'react';
import './BuyCoins.css';

class BuyCoins extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            canBuy: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: parseInt(e.target.value),
        }, () => {
            var canBuy;

            if(this.state.amount > 0 && !isNaN(this.state.amount))
                canBuy = true;
            else
                canBuy = false;
            this.setState({
                canBuy
            })
        })
    }

    buy = (e) => {
        e.preventDefault();

        this.props.buyFunc(this.state.amount);
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <div id="mine">
                <h1>Buy ShintoCoins</h1>
                <p>
                    Current ShintoCoin Value: ${this.props.valuation}.00
                    <br />
                    Number of ShintoCoins Owned: {this.props.coins}
                </p>
                <form id="buyForm" onSubmit={this.buy}>
                    <input type="number" id="amount" name="amount" onChange={this.handleChange}/>
                    <button id="buy" className="button" disabled={!this.state.canBuy}>Buy</button>
                </form>
            </div>
        )
    }
}

export default BuyCoins;