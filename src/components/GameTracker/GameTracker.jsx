import React, { Component } from 'react';

class GameTracker extends Component {
  constructor(){
      super();

      this.state = {
          clicked: false
      }
  }

  handleClick(){

  }

  render() {
    return (
      <div className="GameTracker">
        <h1>GameTracker</h1>
        <h2>DisplayOpponentandDate</h2>
        <ul>
            PlayerStatsMapped
        </ul>
        <button>Submit Button</button>
      </div>
    );
  }
}

export default GameTracker;