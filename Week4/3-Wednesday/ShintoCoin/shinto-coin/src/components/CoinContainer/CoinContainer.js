import React from 'react';
import { Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import axios from 'axios';
import './CoinContainer.css';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import MineCoins from '../MineCoins/MineCoins';


class CoinContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userCoins: 0,
            ledger: [],
            shintoValuation: 1,
        }
    }

    mineShintoCoin = () => {
        console.log("Mining!");
        axios.post("http://localhost:4200/ledger", {action:'Mined', amount: 1})
        .then((response) => {
            console.log(response.data);
        })
    }

    render() {
        return (
            <div id="appWrapper">
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path='/' render={() => <Redirect to='/home' />} />
                        <Route path='/home' component={Home} />
                        <Route path='/mine' render={() => <MineCoins mineFunc={this.mineShintoCoin} /> } />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default CoinContainer;