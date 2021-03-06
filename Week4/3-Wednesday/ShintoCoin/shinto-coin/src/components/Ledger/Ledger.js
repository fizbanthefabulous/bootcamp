import React from 'react';
import LedgerEntry from '../LedgerEntry/LedgerEntry';
import './Ledger.css';

const Ledger = (props) => {
    var entries = props.ledger.map((entry) => <LedgerEntry action={entry.action} amount={entry.amount} valuation={entry.valuation} key={entry.id} id={entry.id} />)

    return (
        <div id="ledger">
            <h1>Browse the Ledger</h1>
            <p>Here you can browse all ShintoCoin transactions.</p>
            <div id="ledgerTable">
                <span>ShintoCoin Ledger</span>
                <table>
                    <thead>
                        <tr>
                            <td>Action</td>
                            <td>Amount</td>
                            <td>Value</td>
                            <td>{/*Empty header to hold Details column space*/}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {entries}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ledger