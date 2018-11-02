import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import PlayerStats from '../PlayerStats/PlayerStats';
import axios from 'axios';

class GameTracker extends Component {
  constructor(){
      super();

    this.state = {
        players: [],
    }
    this.goToTeam = this.goToTeam.bind(this)
  }

  async componentDidMount(){
    // console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    } else {
      axios.get(`/api/team/${this.props.team.team_id}`)
          .then( (team) => {
            console.log(team)
            let {data} = team
            for (let i = 0; i<data.length; i++){
              let {player_id, player_name, player_position} = data[i]
              this.setState({players: [...this.state.players, {player_id, player_name, player_position}]})
            }
          })
    }
  }

  goToTeam(){
    let {team_id} = this.props.team
    this.props.history.push(`/teamDash/${team_id}`)
  }

  render() {

    let players = this.state.players.map( (player, i) => {
      let {player_id, player_name, player_position} = player
      return (
        <div className='player-stat-record' key={i}>
          <PlayerStats player_id={player_id} player_name={player_name} player_position={player_position} game_id={this.props.game.game_id}/>
        </div>
      )
    })

    return (
      <div className="GameTracker">
        <Header />
        <h1>GameTracker</h1>
        <h2>{this.props.game.game_date} vs. {this.props.game.opponent_name}</h2>
        {players}
        <button onClick={this.goToTeam}>Submit Button</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    team: state.team,
    game: state.game
  }
}

export default connect ( mapStateToProps ) (withRouter ( GameTracker ));