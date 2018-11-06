import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Header/Header';
import './PlayerDetail.css';
import Charts from '../Charts/Charts';
import axios from 'axios';

class PlayerDetail extends Component {
  constructor(){
    super();

    this.state = {

      gameStats: [],
      gameDates: [],
      fgPercents: [],
      ftPercents: [],
      playerName: '',
      playerPos: '',
      playerFTM: [],
      playerFTA: [],
      playerFGM: [],
      playerFGA: [],
      playerOReb: 0,
      playerDReb: 0,
      playerTO: 0
    }
    this.calculatePercent = this.calculatePercent.bind(this)
    this.getTotal = this.getTotal.bind(this)
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
          this.setState({gameDates: [...this.state.gameDates, game_date]})
          this.setState({playerFTM: [...this.state.playerFTM, free_throws_made]})
          this.setState({playerFTA: [...this.state.playerFTA, free_throws_attempted]})
          let ftPercent = this.calculatePercent(free_throws_made, free_throws_attempted)
          this.setState({ftPercents: [...this.state.ftPercents, ftPercent]})

          this.setState({playerFGM: [...this.state.playerFGM, field_goals_made]})
          this.setState({playerFGA: [...this.state.playerFGA, field_goals_attempted]})
          let fgPercent = this.calculatePercent(field_goals_made, field_goals_attempted)
          this.setState({fgPercents: [...this.state.fgPercents, fgPercent]})

          this.setState({playerOReb: (this.state.playerOReb + o_rebounds)})
          this.setState({playerDReb: (this.state.playerDReb + d_rebounds)})
          this.setState({playerTO: (this.state.playerTO + turnovers)})
        }
      }
    }
  }

  calculatePercent(numerator, denominator){
    console.log(numerator, denominator)
    if(!denominator){
      return null
    } else {
      return Math.round((numerator/denominator)*100)
    }
  }

  getTotal(arr){
    console.log(arr)
    return arr.reduce( (acc, val) => {
      return acc+val;
    }, 0);
  }

  render() {
    console.log(this.state.gameDates)

    let gameStats = this.state.gameStats.map( (game, i) => {
      return (
        <tr key={i}>
          <td>{game.game_date}</td>
          <td>{game.opponent_name}</td>
          <td>{game.field_goals_made}</td>
          <td>{game.field_goals_attempted}</td>
          <td>{this.calculatePercent(game.field_goals_made, game.field_goals_attempted)}%</td>
          <td>{game.free_throws_made}</td>
          <td>{game.free_throws_attempted}</td>
          <td>{this.calculatePercent(game.free_throws_made, game.free_throws_attempted)}%</td>
          <td>{game.o_rebounds}</td>
          <td>{game.d_rebounds}</td>
          <td>{game.turnovers}</td>
        </tr>
      )
    });

    let fgStats = {
      labels: this.state.gameDates,
      datasets: [{
        label: 'FG Percentage',
        data: this.state.fgPercents,
        backgroundColor:[
          'rgba(255, 159, 64, 0.6)'
        ]
      }]
    }

    let ftStats = {
      labels: this.state.gameDates,
      datasets: [{
        label: 'FT Percentage',
        data: this.state.ftPercents,
        backgroundColor:[
          'rgba(54, 162, 235, 0.6)'
        ]
      }]
    }

    let {playerName, playerPos, playerFGM, playerFGA, playerFTM, playerFTA, playerOReb, playerDReb, playerTO} = this.state;

    let totalFGM = this.getTotal(playerFGM);
    let totalFGA = this.getTotal(playerFGA);
    let totalFTM = this.getTotal(playerFTM);
    let totalFTA = this.getTotal(playerFTA);

    return (
      <div className="PlayerDetail">
        <Header />
        <div className='back-btn'>
          <button onClick={ () => this.props.history.push(`/teamDash/${this.props.team_id}`)}>Back</button>
        </div>
        <div className='PlayerSummary'>
          <h1>{playerName}</h1>
          <h2>{playerPos}</h2>
          <table className='stat-summary'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Opponent</th>
                <th>FTM</th>
                <th>FTA</th>
                <th>FT%</th>
                <th>FGM</th>
                <th>FGA</th>
                <th>FG%</th>
                <th>OREB</th>
                <th>DREB</th>
                <th>TO</th>
              </tr>
            </thead>
            <tbody>
              {gameStats}
            </tbody>
            <tfoot>
              <tr>
                <th>TOTALS</th>
                <td></td>
                <td>{totalFGM}</td>
                <td>{totalFGA}</td>
                <td>{this.calculatePercent(totalFGM, totalFGA)}%</td>
                <td>{totalFTM}</td>
                <td>{totalFTA}</td>
                <td>{this.calculatePercent(totalFTM, totalFTA)}%</td>
                <td>{playerOReb}</td>
                <td>{playerDReb}</td>
                <td>{playerTO}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className='chart-wrapper'>
          <div className='charts'>
            <Charts chartData={ftStats} title='FG Percentage'/>
            <Charts chartData={fgStats} title='FT Percentage'/>
          </div> 
        </div> 
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