import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {updateUser} from '../../dux/reducer';
import Header from '../Header/Header';
import axios from 'axios';

class Settings extends Component {
  constructor(){
    super();

    this.state = {
      email: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
  }

  async componentDidMount(){
    console.log(this.props.user)
    if(!this.props.user.coach_id){
      this.props.history.push('/')
    }
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  updateEmail(){
    let {coach_id, username, p_word} = this.props.user
    let {email} = this.state
    axios.put('/api/updateEmail', {coach_id, email})
      .then( () => {
        let updatedUser = {coach_id, username, email, p_word}
        this.props.updateUser(updatedUser)
      })
  }

  render() {
    return (
      <div className="Settings">
        <Header />
        Settings
        <div className='update-email'>
          <h1>
            Email: {this.props.user.email}
          </h1>
          <p>
            New Email:
            <input type="email" placeholder="New Email" name="email" onChange={this.handleInput} />
          </p>
          <button onClick={this.updateEmail}>Update Email</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default connect ( mapStateToProps, {updateUser} ) (withRouter(Settings));
