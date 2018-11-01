import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../dux/reducer';

import logo from '../../images/logo.png'

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.register = this.register.bind(this)
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  register(){
    const {username, email, password} = this.state
    axios.post('/api/register', {username, email, password})
        .then( async (res) => {
          console.log(res)
          if(res.status === 200) {
            let resWithCoachId = await axios.get('/api/coach_session');
            // console.log(resWithCoachId)
            this.props.updateUser(resWithCoachId.data)
            this.props.history.push('/dashboard')
          }
        })
        .catch( err => {
          alert('Registration failed, please try a different username and password.')
          window.location.reload();
        })
      }

  render() {
    return (
      <div className="Register">
        <img src={logo} alt="logo"/>
        <h3>Register below to start tracking your teams!</h3>
        <p>
          Username:
          <input type="text" placeholder="Username" name='username' onChange={this.handleInput} />
        </p>
        <p>
          Email:
          <input type="text" placeholder="Email" name="email" onChange={this.handleInput} />
        </p>
        <p>
          Password:
          <input type="password" placeholder="Password" name='password' onChange={this.handleInput} />
        </p>
        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect ( mapStateToProps, {updateUser} ) (Register);
