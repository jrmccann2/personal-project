import React, { Component } from 'react';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import {updateTeam} from '../../dux/reducer';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import './Dashboard.css';

class Dashboard extends Component {
  constructor(){
    super();

    this.state = {
      teams: []
    }
    // this.goToTeam = this.goToTeam.bind(this)
  }

  async componentDidMount(){
    // console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    } else {
      const {coach_id} = this.props.user
      let resWithTeams = await axios.get(`/api/teams/${coach_id}`)
          // console.log(resWithTeams.data)
          this.setState({teams: resWithTeams.data})
    }
  }

  dropTeam(team_id){
    let {coach_id} = this.props.user
    console.log(team_id, coach_id)
    axios.delete(`/api/dropTeam/${team_id}/${coach_id}`)
        .then( (updatedTeams) => {
          console.log(updatedTeams.data)
          this.setState({teams: updatedTeams.data})
        })
  }

  goToTeam(team){
    this.props.updateTeam(team)
    this.props.history.push(`/teamDash/${team.team_id}`)
  }
    
  render() {

    let teams = this.state.teams.map( (team, i) => {
      return (
        <div className='team-display' key={i}>
          <h2 onClick={ () => this.goToTeam(team)}>{team.team_name}</h2>
          <button onClick={ () => this.dropTeam(team.team_id)}>Drop Team</button>
        </div>
      )
    })

    return (
      <div className="Dashboard">
        <Header />
        <div className='dash-wrapper'>
          <div className='dash-header'>
            My Teams
            <Link to='/newTeam'><button>Add Team</button></Link>
          </div>
          {teams}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, {updateTeam} ) (withRouter(Dashboard));
