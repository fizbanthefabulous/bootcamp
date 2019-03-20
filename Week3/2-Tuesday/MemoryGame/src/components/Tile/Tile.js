import React from 'react';
import './Tile.css';

const TileKey = {
  'stark': '../img/stark.png',
  'lannister': '../img/lannister.png',
  'baratheon': '../img/baratheon.png',
  'martell': '../img/martell.png',
  'greyjoy': '../img/greyjoy.png',
  'targaryen': '../img/targaryen.png',
  'tyrell' : '../img/tyrell.png',
  'tully' : '../img/tully.png',
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
