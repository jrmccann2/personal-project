import React, { Component } from 'react';
import axios from 'axios';
import './PlayerStats.css';

class PlayerStats extends Component {
  constructor(){
    super();

    this.state = {

      stat_line_id: 0,
      free_throws_made: 0,
      free_throws_attempted: 0,
      field_goals_made: 0,
      field_goals_attempted: 0,
      o_rebounds: 0,
      d_rebounds: 0,
      turnovers: 0

    }
    this.incrementStat = this.incrementStat.bind(this)
    this.decrementStat = this.decrementStat.bind(this)
  }

  componentDidMount(){
    let {player_id, game_id} = this.props;
    axios.post('/api/initStats', {player_id, game_id})
        .then( (res)=> {
          console.log(res)
          let {stat_line_id} = res.data[0]
          this.setState({stat_line_id: stat_line_id})
        })
  }

  incrementStat(event){
    let {name} = event.target
    let value = (this.state[name]+1)
    this.setState({[name]: value})
    let {stat_line_id} = this.state
    axios.put('/api/updateStats', { name, value, stat_line_id})
        .then( (res)=> console.log(res.status))
  }

  decrementStat(event){
    let {name} = event.target
    let value = (this.state[name]-1)
    this.setState({[name]: value})
    let {stat_line_id} = this.state
    axios.put('/api/updateStats', {name, value, stat_line_id})
        .then( (res) => console.log(res.status))
  }

  render() {
    return (
      <div className="PlayerStats">

        <h2>{this.props.player_name}</h2>

        <div className='stat-display'>

          <div className='stat-display-box'>
            <h3>FGM</h3>
            <p>{this.state.field_goals_made}</p>
            <div className='stat-input'>
              <button name='field_goals_made' onClick={this.incrementStat}>+</button>
              <button name='field_goals_made' onClick={this.decrementStat}>-</button>
            </div>
          </div>

          <div className='stat-display-box'>
            <h3>FGA</h3>
            <p>{this.state.field_goals_attempted}</p>
            <div className='stat-input'>
              <button name='field_goals_attempted' onClick={this.incrementStat}>+</button>
              <button name='field_goals_attempted' onClick={this.decrementStat}>-</button>
            </div>
          </div>

          <div className='stat-display-box'>
            <h3>FTM</h3>
            <p>{this.state.free_throws_made}</p>
            <div className='stat-input'>
              <button name='free_throws_made' onClick={this.incrementStat}>+</button>
              <button name='free_throws_made' onClick={this.decrementStat}>-</button>
            </div>
          </div>

          <div className='stat-display-box'>
            <h3>FTA</h3>
            <p>{this.state.free_throws_attempted}</p>
            <div className='stat-input'>
              <button name='free_throws_attempted' onClick={this.incrementStat}>+</button>
              <button name='free_throws_attempted' onClick={this.decrementStat}>-</button>
            </div>
          </div>

          <div className='stat-display-box'>
            <h3>OReb</h3>
            <p>{this.state.o_rebounds}</p>
            <div className='stat-input'>
              <button name='o_rebounds' onClick={this.incrementStat}>+</button>
              <button name='o_rebounds' onClick={this.decrementStat}>-</button>
            </div>
          </div>

          <div className='stat-display-box'>
            <h3>DReb</h3>
            <p>{this.state.d_rebounds}</p>
            <div className='stat-input'>
              <button name='d_rebounds' onClick={this.incrementStat}>+</button>
              <button name='d_rebounds' onClick={this.decrementStat}>-</button>
            </div>
          </div>

          <div className='stat-display-box'>
            <h3>TO</h3>
            <p>{this.state.turnovers}</p>
            <div className='stat-input'>
              <button name='turnovers' onClick={this.incrementStat}>+</button>
              <button name='turnovers' onClick={this.decrementStat}>-</button>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default PlayerStats;