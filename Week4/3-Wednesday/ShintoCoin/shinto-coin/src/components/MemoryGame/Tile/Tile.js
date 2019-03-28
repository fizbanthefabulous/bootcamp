import React from 'react';
import './Tile.css';

const TileKey = {
  'stark': '../imgs/stark.png',
  'lannister': '../imgs/lannister.png',
  'baratheon': '../imgs/baratheon.png',
  'martell': '../imgs/martell.png',
  'greyjoy': '../imgs/greyjoy.png',
  'targaryen': '../imgs/targaryen.png',
  'tyrell' : '../imgs/tyrell.png',
  'tully' : '../imgs/tully.png',
}

const Tile = (props) => {

  return (
    <div className='tile' id={props.id} onClick={(e) => props.updateTile(e)}>
      {/*!props.status ? <h1>{props.value}</h1> : null*/}
      {!props.status ? <img src={TileKey[props.value]} alt={props.value}/> : null}
    </div>
  );
}

export default Tile;
