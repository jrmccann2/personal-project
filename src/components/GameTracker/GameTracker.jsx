import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Header/Header';

class GameTracker extends Component {
  constructor(){
      super();

      this.state = {
          clicked: false
      }
  }

  async componentDidMount(){
    console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    } else {

    }
  }

  handleClick(){

  }

  render() {
    return (
      <div className="GameTracker">
        <Header />
        <h1>GameTracker</h1>
        <h2>DisplayOpponentandDate</h2>
        <ul>
            PlayerStatsMapped
        </ul>
        <button>Submit Button</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect ( mapStateToProps ) (withRouter ( GameTracker ));