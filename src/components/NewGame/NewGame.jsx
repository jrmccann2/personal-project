import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateGame} from '../../dux/reducer';
import Header from '../Header/Header';
import axios from 'axios';

class NewGame extends Component {
  constructor(){
    super();

    this.state = {
        opponentName: '',
        date: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.createGame = this.createGame.bind(this)
  }

  async componentDidMount(){
    // console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    }
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  createGame(){
    let {opponentName, date} = this.state
    axios.post('/api/createGame', {opponentName, date})
        .then( (game) => {
          console.log(game.data)
          this.props.updateGame(game.data)
          this.props.history.push('/gameTracker')
        })
  }

  render() {
    return (
      <div className="NewGame">
        <Header />
        New Game
        <div className='NewGame'>
            <form className='player-form'>
              <p>
                Opponent Name:
                <input type="text" placeholder="Opponent Name" name='opponentName' onChange={this.handleInput} ref={(ref) => this.opponentName_input = ref}/>
              </p>
              <p>
                Date:
                <input type="date" placeholder="YYYY/MM/DD" name='date' onChange={this.handleInput} ref={(ref) => this.date_input = ref} />
              </p>
            </form>
            <button onClick={this.createGame}>Start Game</button>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    team: state.team
  }
}

export default connect ( mapStateToProps, {updateGame} ) (withRouter( NewGame ));
