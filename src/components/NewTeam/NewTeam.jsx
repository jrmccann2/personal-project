import React, { Component } from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import NewPlayer from '../NewPlayer/NewPlayer';

class NewTeam extends Component {
  constructor(){
    super();

    this.state = {
      teamName: '',
      team_id: 0
    }
    this.handleInput = this.handleInput.bind(this)
    this.addTeam = this.addTeam.bind(this)
  }

  componentDidMount(){
    // console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    }
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  addTeam(){
    const {teamName} = this.state;
    const {coach_id} = this.props.user;
    this.input.value = '';
    axios.post('/api/addTeam', {teamName, coach_id})
        .then( (team) => {
          const {team_id} = team.data
          this.setState({team_id: team_id})
        })
  }

  render() {
    
    if(this.state.team_id !== 0) {
      return (
        <div className="NewTeam">
          <Header />
          <h1>
            Team Name: {this.state.teamName}
          </h1>
          <NewPlayer team_id={this.state.team_id} />
          <Link to='/dashboard'><button>Submit Roster</button></Link>
        </div>
      );
    } else {
      return (
        <div className="NewTeam">
          <Header />
          <p>
            Team Name:
            <input type="text" placeholder="Team Name" name='teamName' onChange={this.handleInput} ref={(ref) => this.input = ref} />
          </p>
          <button onClick={this.addTeam}>Add New Team</button>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect (mapStateToProps) (withRouter (NewTeam));
