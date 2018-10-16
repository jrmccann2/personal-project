import React, { Component } from 'react';

class PlayerStats extends Component {
  constructor(){
    super();

    this.state = {

        ftMade: 0,
        ftAttempted: 0,
        fgMade: 0,
        fgAttempted: 0,
        o_rebounds: 0,
        d_rebounds: 0,
        turnovers: 0

    }
  }

  incrementStat(){

  }

  decrementStat(){

  }

  submitStat(){

  }

  render() {
    return (
      <div className="PlayerStats">
        PlayerStats
      </div>
    );
  }
}

export default PlayerStats;
