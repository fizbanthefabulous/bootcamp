import React, { Component } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import Controller from '../Controller/Controller';
import update from 'immutability-helper';
import './MemoryGame.css';


class MemoryGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameboard: [
        { value: 'stark', hidden: true },
        { value: 'stark', hidden: true },
        { value: 'lannister', hidden: true },
        { value: 'lannister', hidden: true },
        { value: 'baratheon', hidden: true },
        { value: 'baratheon', hidden: true },
        { value: 'greyjoy', hidden: true },
        { value: 'greyjoy', hidden: true },
        { value: 'martell', hidden: true },
        { value: 'martell', hidden: true },
        { value: 'targaryen', hidden: true },
        { value: 'targaryen', hidden: true },
        { value: 'tyrell', hidden: true },
        { value: 'tyrell', hidden: true },
        { value: 'tully', hidden: true },
        { value: 'tully', hidden: true },
      ],
      click1id: null,
      click2id: null,
      matches: 0,
      gameState: 'before',
      gameMessage: 0,
      guessCounter: 0
    }
  }

  //Resets mismatched tiles to hidden after a bad guess
  resetTiles = () => {
    console.log("reset tiles");
    let tempTile1 = Object.assign({}, this.state.gameboard[this.state.click1id]);
    let tempTile2 = Object.assign({}, this.state.gameboard[this.state.click2id]);

    tempTile1.hidden = true;
    tempTile2.hidden = true;

    this.setState({
      gameboard: update(update(this.state.gameboard, { [this.state.click1id]: { $set: tempTile1 } }), { [this.state.click2id]: { $set: tempTile2 }, }),
      click1id: null,
      click2id: null,
    });
  }


  //Update clicked tile
  updateTile = (props) => {
    console.log('updating', props.target.id);
    let tempTile = Object.assign({}, this.state.gameboard[props.target.id]);
    console.log(this.state)

    //Check to make sure the following conditions are in place before doing anything:
    //  -clicked file is currently hidden
    //  -game is in play mode
    //  -tile 1 or tile 2 of a guess has yet to be clicked
    if (tempTile.hidden && this.state.gameState === 'during' && (this.state.click1id === null || this.state.click2id === null)) {
      var tmpClickid1 = null;
      var tmpClickid2 = null;
      var matches = this.state.matches;
      var tempGameState = this.state.gameState;
      var tempGuessCounter = this.state.guessCounter;
      tempTile.hidden = false;

      //Check if this is the first click
      if (this.state.click1id === null) {
        tmpClickid1 = props.target.id;
      }
      //Check if the second clicked tile value matches that of the first
      else if (tempTile.value === this.state.gameboard[this.state.click1id].value) {
        console.log("A MATCH");
        tmpClickid1 = null;
        tempGuessCounter += 1;

        //If this will be the last match of the game set the game to over
        if (matches === 7) {
          //game state is over
          tempGameState = 'over';
        }
        else {
          matches += 1;
        }
      }
      //This is not a match
      else {
        console.log("not a match")
        //hide last two clicked tiles
        tmpClickid2 = props.target.id;
        tmpClickid1 = this.state.click1id;
        tempGuessCounter += 1;
        setTimeout(this.resetTiles, 1000);
      }

      //ES6 computation setup
      let idx = props.target.id;
      this.setState({
        //Use of immutability-helper
        gameboard: update(this.state.gameboard, { [idx]: { $set: tempTile } }),
        click1id: tmpClickid1,
        click2id: tmpClickid2,
        matches,
        gameState: tempGameState,
        guessCounter: tempGuessCounter,
      }, () => {
        if(this.state.gameState === "over")
          this.props.mineFunc(this.state.guessCounter === 8);
      })
    }
  }


  //Randomize initial game board
  initBoard = (props) => {

    /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {String}      The first item in the shuffled array
   */
    var shuffle = function (array) {

      var currentIndex = array.length;
      var temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;

    };

    console.log("Shuffling board", props);
    shuffle(props);
    shuffle(props);
    shuffle(props);

    return props;
  }


  //Hide initialized board after memory look
  hideAllTiles = (props) => {
    let newBoard = this.state.gameboard.map((tile, idx) => {
      return (
        { value: tile.value, hidden: true }
      )
    });



    this.setState({ gameboard: newBoard, gameState: props });
  }



  /* Countdown function block */
  //Shows the tiles for memorization then hides them for the match game to begin
  go = () => {
    //Just taking space
    console.log("Countdown done!");

    var newBoard = this.state.gameboard.map((tile, idx) => {
      return (
        { value: tile.value, hidden: false }
      )
    });

    console.log("Starting new game", newBoard);
    newBoard = this.initBoard(newBoard);

    this.setState({
      gameboard: newBoard,
      click1id: null,
      click2id: null,
      matches: 0,
      gameMessage: 0,
      guessCounter: 0,
    });

    setTimeout(() => this.hideAllTiles('during'), 3000);
  }


  //Counts down to memorize time
  countDown = (props) => {
    if (props > 0) {
      this.setState({
        gameMessage: props
      })
      setTimeout(() => this.countDown(props - 1), 1000);
    }
    else {
      setTimeout(this.go, 1000);
    }
  };
  /* End Countdown Function block */



  //Start a new game
  startGame = (props) => {
    this.hideAllTiles('ready');
    this.countDown(3);
  }


  render() {
    console.log(this.state);
    return (
      <div id="gameWrapper">
        <h3>Guess Counter: {this.state.guessCounter}</h3>
        <GameBoard board={this.state.gameboard} updateTile={this.updateTile} />
        <Controller gameState={this.state.gameState} start={this.startGame} message={this.state.gameMessage} />
      </div>
    );
  }
}

export default MemoryGame;
