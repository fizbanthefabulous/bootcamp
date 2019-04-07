import React from 'react';
import './GoldDisplay.css';
import { connect } from 'react-redux';

const GoldDisplay = (props) => {


    return (
        <div>
            <div className="gold-display">
                <h1>Gold Count: {props.gold}</h1>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    gold: state.gold,
})

const mapDispatchToProps = (dispatch) => ({
    //Don't need any actions
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoldDisplay);