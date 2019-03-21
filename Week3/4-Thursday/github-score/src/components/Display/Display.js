import React from 'react';
import mapScoreMessage from '../../utility/MappingFunctions';
import scoreMessage from '../../constants/ScoreConsts';
import './Display.css';

const Display = (props) => {

    console.log(props);
    if(props.score != null) {
        var message = mapScoreMessage(props.score);
    }

    return (
        <div className="display">
            {props.score != null ? 
                <div>
                    <h1>Your Score: {props.score}</h1>
                    <span className={message}>{scoreMessage[message]}</span>
                </div>
                : null
            }
            {props.errorMessage != null ?
                <div>
                    <h3>{props.errorMessage}</h3>
                </div>
                : null
            }
        </div>
    )
}

export default Display;