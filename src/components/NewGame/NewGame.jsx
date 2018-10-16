import React, { Component } from 'react';

class NewGame extends Component {
  constructor(){
    super();

    this.state = {
        opponentName: '',
        date: ''
    }
  }

  handleChange(){

  }

  createGame(){

  }

  render() {
    return (
      <div className="NewGame">
        New Game
      </div>
    );
  }
}

export default NewGame;
