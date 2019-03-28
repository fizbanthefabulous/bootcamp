import React from 'react';
import { Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import './CoinContainer.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import MineCoins from '../MineCoins/MineCoins';
import BuyCoins from '../BuyCoins/BuyCoins';
import SellCoins from '../SellCoins/SellCoins';
import Ledger from '../Ledger/Ledger';
import Transaction from '../Transaction/Transaction';


class CoinContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userCoins: 0,
            ledger: [],
            shintoValuation: 1,
        }
    }

    componentDidMount() {
        console.log("Fetching initial state");

        axios.get("http://localhost:4200/ledger")
        .then((response) => {
            console.log(response.data);

            this.setState({
                userCoins: response.data.coinbank,
                ledger: response.data.ledger,
                shintoValuation: response.data.valuation,
            })
        })
        .catch((error) => {
            console.log("The plane, the plane!")
        })
    }


    updateDataStore = (action, amount) => {
        axios.post("http://localhost:4200/ledger", {action, amount})
        .then((response) => {
            this.setState({
                userCoins: response.data.coinbank,
                ledger: [...this.state.ledger, 
                    {id: response.data.id,
                     action: response.data.action, 
                     createdAt: response.data.createdAt,
                     amount: response.data.amount,
                     valuation: response.data.valuation
                    }],
                shintoValuation: response.data.valuation,
            })
        })
        .catch((error) => {
            console.log("It's dead Jim!");
        })
    }


    mineShintoCoin = () => {
        console.log("Mining!");   
        this.updateDataStore("Mined", 1);
    }


    buyShintoCoins = (amount) => {
        console.log("Buying!");
        this.updateDataStore("Bought", amount);
    }


    sellShintoCoins = (amount) => {
        console.log("Selling!");
        this.updateDataStore("Sold", amount);
    }


    render() {
        console.log(this.state);
        return (
            <div id="appWrapper">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/home' />} />
                        <Route path='/home' component={Home} />
                        <Route path='/mine' render={() => <MineCoins mineFunc={this.mineShintoCoin} /> } />
                        <Route path='/buy' render={() => <BuyCoins buyFunc={this.buyShintoCoins} coins={this.state.userCoins} valuation={this.state.shintoValuation}/> } />
                        <Route path='/sell' render={() => <SellCoins sellFunc={this.sellShintoCoins} coins={this.state.userCoins} valuation={this.state.shintoValuation}/> } />
                        <Route path='/ledger' render={() => <Ledger ledger={this.state.ledger} /> } />
                        <Route path='/transaction/:id' render={(props) => <Transaction {...props} /> } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default CoinContainer;