import React, { Component } from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updatePlayer} from '../../dux/reducer';
import Header from '../Header/Header';
import NewPlayer from '../NewPlayer/NewPlayer';

class TeamDash extends Component {
  constructor(){
    super();

    this.state = {

      players: [],
      teamName: '',
      teamFTM: 0,
      teamFTA: 0,
      teamFGM: 0,
      teamFGA: 0,
      teamOReb: 0,
      teamDReb: 0,
      teamTO: 0

    }
  }

  async componentDidMount(){
    console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    } else {
      this.setState({teamName: this.props.team.team_name})
      let resWithTeam = await axios.get(`/api/team/${this.props.team.team_id}`)
      let teamData = resWithTeam.data
      let resWithTeamStats = await axios.get(`/api/teamStats/${this.props.team.team_id}`)
      let teamStats = resWithTeamStats.data
      console.log(teamData, teamStats)
      if(!teamData[0]){
        return null
      } else {
        for (let i = 0; i<teamData.length; i++){
          let {player_id, player_name, player_position} = teamData[i]
          this.setState({players: [...this.state.players, {player_id, player_name, player_position}]})
        }
        for (let i = 0; i<teamStats.length; i++){
          let {free_throws_made, free_throws_attempted, field_goals_made, field_goals_attempted, o_rebounds, d_rebounds, turnovers} = teamStats[i]
          this.setState({
            teamFTM: (this.state.teamFTM + free_throws_made),
            teamFTA: (this.state.teamFTA + free_throws_attempted),
            teamFGM: (this.state.teamFGM + field_goals_made),
            teamFGA: (this.state.teamFGA + field_goals_attempted),
            teamOReb: (this.state.teamOReb + o_rebounds),
            teamDReb: (this.state.teamDReb + d_rebounds),
            teamTO: (this.state.teamTO + turnovers)
          })
        }
      }
    }
  }

  dropPlayer( player ){
    let {player_id} = player
    axios.delete(`/api/dropPlayer/${player_id}/${this.props.team.team_id}`)
        .then( (updatedPlayers) => {
          this.setState({players: updatedPlayers})
        })
  }

  goToPlayer(player){
    let {player_id} = player
    this.props.updatePlayer(player_id)
    this.props.history.push(`/playerDetail/${player_id}`)
  }

  render() {

    let players = this.state.players.map( (player, i) => {
      return (
        <div className='player-display' key={i}>
            <h2 onClick={ () => this.goToPlayer(player)}>{player.player_name}</h2>
            <h3>{player.player_position}</h3>
          <button onClick={ () => this.dropPlayer(player)}>Drop Player</button>
        </div>
      )
    })

    if(this.state.teamName === ''){
      return (
        <div className='EmptyTeam'>
          <Header />
          <h1>Fill out your roster!</h1>
          <NewPlayer team_id={this.props.team.team_id}/>
          <Link to='/dashboard'><button>Submit Roster</button></Link>
        </div>
      )
    } else {

      return (
        <div className="TeamDash">
          <Header />
          <button onClick={ () => this.props.history.push(`/dashboard`)}>Back</button>
          <h1>{this.state.teamName}</h1>
          <section className='team-stats'>
            <p>FT Percentage: {Math.round((this.state.teamFTM / this.state.teamFTA)*100)}%</p>
            <p>FG Percentage: {Math.round((this.state.teamFGM / this.state.teamFGA)*100)}%</p>
            <p>O. Rebounds: {this.state.teamOReb}</p>
            <p>O. Rebounding Percentage: {Math.round((this.state.teamOReb / this.state.teamFGA)*100)}%</p>
            <p>D. Rebounds: {this.state.teamDReb}</p>
            <p>Turnovers: {this.state.teamTO}</p>
          </section>
          <NewPlayer team_id={this.props.team.team_id}/>
          <div className='roster'>
            {players}
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    team: state.team
  }
}

export default connect ( mapStateToProps, {updatePlayer} ) (withRouter(TeamDash));