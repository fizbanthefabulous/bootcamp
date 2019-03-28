import React from 'react';
import axios from 'axios';
import './Transaction.css';


class Transaction extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            transaction: null
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4200/ledger/${this.props.match.params.id}`)
        .then((response) => {
            this.setState({
                transaction: response.data,
            })
        })
    }

    render() {
        console.log("Transaction: ", this.state);
        return (
            <div id="transaction"> 
                <h1>Ledger Transaction Details</h1>
                <p>Detailed view of a transaction from the ledger.</p>
                {this.state.transaction!== null ?
                    <p>
                        Transaction #{this.state.transaction.id} <br/>
                        Timestamp:  {(new Date(this.state.transaction.createdAt)).toString()}<br />
                        Action: {this.state.transaction.action} {this.state.transaction.amount} ShintoCoin <br />
                        ShintoCoin Value: ${this.state.transaction.valuation}.00 (after transaction) <br />
                    </p>
                    :
                    <h6>Transaction #{this.props.match.params.id} was not found.</h6>
                }
            </div>
        )
    }
}

export default Transaction