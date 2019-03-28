import React from 'react';
import './SellCoins.css';

class SellCoins extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            amount: 0,
            canSell: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: parseInt(e.target.value),
        }, () => {
            var canSell;

            if(this.props.coins > 0 && !isNaN(this.state.amount) && this.props.coins >= this.state.amount && this.state.amount > 0)
                canSell = true;
            else
                canSell = false;
            this.setState({
                canSell
            })
        })
    }

    sell = (e) => {
        e.preventDefault();

        this.props.sellFunc(this.state.amount);
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <div id="mine">
                <h1>Sell ShintoCoins</h1>
                <p>
                    Current ShintoCoin Value: ${this.props.valuation}.00
                    <br />
                    Number of ShintoCoins Owned: {this.props.coins}
                </p>
                <form id="sellForm" onSubmit={this.sell}>
                    <input type="number" id="amount" name="amount" onChange={this.handleChange}/>
                    <button id="sell" className="button" disabled={!this.state.canSell}>Sell</button>
                </form>
            </div>
        )
    }
}

export default SellCoins;