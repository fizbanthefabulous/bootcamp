import React from 'react';
import './Controller.css';

const Controller = (props) => {
  console.log("Message",props.message);

  return (
    <div className='controller'>
      {props.message !== 0 ? <span className="message">Get ready to memorize in -<span className="countDown">{props.message}</span>-</span> : null}
      {props.gameState === 'before' ? <button className='start-button' onClick={(e) => props.start(e)}>Start</button> : null}
      {props.gameState === 'during' ? <div>Find all the matches :)</div> : null}
      {props.gameState === 'over' ? <button className='start-button' onClick={(e) => props.start(e)}>Play Again</button> : null}
    </div>
  );
}

export default Controller;
