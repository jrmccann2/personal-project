import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Header/Header';

class NewGame extends Component {
  constructor(){
    super();

    this.state = {
        opponentName: '',
        date: ''
    }
  }

  async componentDidMount(){
    console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    } else {

    }
  }

  handleChange(){

  }

  createGame(){

  }

  render() {
    return (
      <div className="NewGame">
        <Header />
        New Game
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect ( mapStateToProps ) (withRouter( NewGame ));
