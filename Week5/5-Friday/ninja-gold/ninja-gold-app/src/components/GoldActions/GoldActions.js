import React from 'react';
import './GoldActions.css';
import { connect } from 'react-redux';
import { addActionToHistory } from '../../utility/helpers';
import { updateHistory } from '../../store/redux';

const GoldActions = (props) => {
    
    const updateGold = (event) => {
        console.log("Updating the gold stash!")
        addActionToHistory(event.target.name, props.gold)
        .then((bankState) => {
            props.updateHistory(bankState.gold, bankState.history);
        })
    }

    return (
        <div className="gold-actions-row">
           <div className="gold-actions-column">
                <h1>Farm</h1>
                <span>Earns 2 - 5 Gold</span>
                <br />
                <button name='farm' onClick={(event) => updateGold(event)}>Farm!</button>
           </div>
           <div className="gold-actions-column">
                <h1>Cave</h1>
                <span>Earns 5-10 Gold</span>
                <br />
                <button name='cave' onClick={(event) => updateGold(event)}>Cave!</button>
           </div>
           <div className="gold-actions-column">
                <h1>Casino</h1>
                <span>Earn up to or Lose up to 100 Gold</span>
                <button name='casino' onClick={(event) => updateGold(event)}>Casino!</button>
           </div>
           <div className="gold-actions-column">
                <h1>House</h1>
                <span>Earns 7 - 15 Gold</span>
                <br />
                <button name='house' onClick={(event) => updateGold(event)}>House!</button>
           </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    gold: state.gold,
})

const mapDispatchToProps = (dispatch) => ({
    updateHistory: (gold, history) => dispatch(updateHistory(gold, history)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoldActions);