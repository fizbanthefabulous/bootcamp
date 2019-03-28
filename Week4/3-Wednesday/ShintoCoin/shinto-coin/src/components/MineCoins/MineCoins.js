import React from 'react';
import MemoryGame from '../MemoryGame/MemoryGame/MemoryGame';
import './MineCoins.css';

class MineCoins extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    mine = (mined) => {
        console.log("Mined?",mined);

        if(mined) {
            this.props.mineFunc();
        }
    }

    //http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote
    render() {
        return (
            <div id="mine">
                <h1>Mine ShintoCoins</h1>
                <p>Here you can mine ShintoCoins by completing this memory game without a single mistake!</p>
                <MemoryGame mineFunc={this.mine} />
            </div>
        )
    }
}

export default MineCoins;