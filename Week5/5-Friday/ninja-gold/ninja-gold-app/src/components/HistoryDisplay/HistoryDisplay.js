import React from 'react';
import './HistoryDisplay.css';
import { connect } from 'react-redux';
import { generateHistoryPhrase } from '../../utility/helpers';

const HistoryDisplay = (props) => {

    let actions = props.history.map((action, idx) => <li key={idx}>{generateHistoryPhrase(action.type, action.amount)}</li>)

    return (
        <div className="history-display">
            <ul>
                {actions}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    history: state.history,
})

const mapDispatchToProps = (dispatch) => ({
    //Don't need any actions
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryDisplay);