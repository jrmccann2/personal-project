import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import axios from 'axios';

class PlayerDetail extends Component {
  constructor(){
    super();

    this.state = {

      gameStats: [],
      playerName: '',
      playerPos: '',
      playerFTM: 0,
      playerFTA: 0,
      playerFGM: 0,
      playerFGA: 0,
      playerOReb: 0,
      playerDReb: 0,
      playerTO: 0
    }
  }

  async componentDidMount(){
    console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    } else {
      let resWithPlayer = await axios.get(`/api/player/${this.props.player_id}`)
      let {data} = resWithPlayer
      console.log(data)
      if(!data[0]){
        return null
      } else {
        let {player_name, player_position} = data[0]
        this.setState({playerName: player_name, playerPos: player_position})
        for (let i = 0; i<data.length; i++){
          let {
            free_throws_made,
            free_throws_attempted,
            field_goals_made,
            field_goals_attempted,
            o_rebounds,
            d_rebounds,
            turnovers,
            opponent_name,
            game_date
          } = data[i]
          this.setState({gameStats: [...this.state.gameStats, {
            free_throws_made,
            free_throws_attempted,
            field_goals_made,
            field_goals_attempted,
            o_rebounds,
            d_rebounds,
            turnovers,
            opponent_name,
            game_date
          }]})
          this.setState({playerFTM: (this.state.teamFTM + free_throws_made)})
          this.setState({playerFTA: (this.state.teamFTA + free_throws_attempted)})
          this.setState({playerFGM: (this.state.teamFGM + field_goals_made)})
          this.setState({playerFGA: (this.state.teamFGA + field_goals_attempted)})
          this.setState({playerOReb: (this.state.teamOReb + o_rebounds)})
          this.setState({playerDReb: (this.state.teamDReb + d_rebounds)})
          this.setState({playerTO: (this.state.teamTO + turnovers)})
        }
      }
    }
  }

  render() {

    let gameStats = this.state.gameStats.map( (game, i) => {
      return (
        <tr key={i}>
          <td>{game.game_date}</td>
          <td>{game.opponent_name}</td>
          <td>{game.field_goals_made}</td>
          <td>{game.field_goals_attempted}</td>
          <td>{Math.round((game.field_goals_made / game.field_goals_attempted)*100)}%</td>
          <td>{game.free_throws_made}</td>
          <td>{game.free_throws_attempted}</td>
          <td>{Math.round((game.free_throws_made / game.free_throws_attempted)*100)}%</td>
          <td>{game.o_rebounds}</td>
          <td>{game.d_rebounds}</td>
          <td>{game.turnovers}</td>
        </tr>
      )
    })

    return (
      <div className="PlayerDetail">
        <Header />
        <button onClick={ () => this.props.history.push(`/teamDash/${this.props.team_id}`)}>Back</button>
        <h1>{this.state.playerName}</h1>
        <h2>{this.state.playerPos}</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
              <th>FGM</th>
              <th>FGA</th>
              <th>FG%</th>
              <th>FTM</th>
              <th>FTA</th>
              <th>FT%</th>
              <th>OREB</th>
              <th>DREB</th>
              <th>TO</th>
            </tr>
          </thead>
          <tbody>
            {gameStats}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    team_id: state.team_id,
    player_id: state.player_id
  }
}

export default connect (mapStateToProps) (withRouter(PlayerDetail));