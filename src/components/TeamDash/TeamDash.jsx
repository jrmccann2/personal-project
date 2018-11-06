import React, { Component } from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {updatePlayer} from '../../dux/reducer';
import Header from '../Header/Header';
import NewPlayer from '../NewPlayer/NewPlayer';
import './TeamDash.css';

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
      teamTO: 0,
      playername: '',
      position: ''

    }
    this.handleInput = this.handleInput.bind(this)
    this.addPlayer = this.addPlayer.bind(this)
    this.calculatePercent = this.calculatePercent.bind(this)
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
      // console.log(teamData, teamStats)
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

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  addPlayer(){
    const {playername, position} = this.state;
    this.name_input.value = '';
    this.pos_input.value = '';
    const {team_id} = this.props.team;
    axios.post('/api/addPlayerLate', {playername, position, team_id})
        .then( (updatedPlayers) => {
          let {data} = updatedPlayers
          this.setState({players: data})
        })
  }

  dropPlayer( player ){
    // console.log(this.props.team.team_id)
    let {player_id} = player
    axios.delete(`/api/dropPlayer/${player_id}/${this.props.team.team_id}`)
        .then( (updatedPlayers) => {
          let {data} = updatedPlayers
          this.setState({players: data})
        })
  }

  goToPlayer(player){
    let {player_id} = player
    this.props.updatePlayer(player_id)
    this.props.history.push(`/playerDetail/${player_id}`)
  }

  calculatePercent(numerator, denominator){
    console.log(numerator, denominator)
    if(!denominator){
      return `N/A`
    } else {
      return `${Math.round((numerator/denominator)*100)}%`
    }
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

    if(!this.state.players[0]){
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
          <div className='btn-holder'>
            <button onClick={ () => this.props.history.push(`/dashboard`)}>Back</button>
          </div>
          <div className='team-overview'>
            <div className='team-name'>
              <h1>{this.state.teamName}</h1>
              <div className='team-name-btns'>
                <Link to='/newGame'><button>New Game</button></Link>
              </div>
            </div>
            <section className='team-stats'>
              <p>FT Percentage: {this.calculatePercent(this.state.teamFTM, this.state.teamFTA)}</p>
              <p>FG Percentage: {this.calculatePercent(this.state.teamFGM, this.state.teamFGA)}</p>
              <p>O. Rebounds: {this.state.teamOReb}</p>
              <p>O. Rebounding Percentage: {this.calculatePercent(this.state.teamOReb, this.state.teamFGA)}</p>
              <p>D. Rebounds: {this.state.teamDReb}</p>
              <p>Turnovers: {this.state.teamTO}</p>
            </section>
            <div className='NewPlayer-team-view'>
              <form className='player-form'>
                <p>
                  Name:
                  <input type="text" placeholder="Player Name" name='playername' onChange={this.handleInput} ref={(ref) => this.name_input = ref}/>
                </p>
                <p>
                  Position:
                  <input type="text" placeholder="Position" name='position' onChange={this.handleInput} ref={(ref) => this.pos_input = ref} />
                </p>
              </form>
              <button onClick={this.addPlayer}>Add Player</button>
            </div>
          </div>
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