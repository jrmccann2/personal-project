import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../dux/reducer';

import logo from '../../images/logo.png'
import '../Login/Login.css'

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
      <div className="Login-container">
        <img className='Login-img' src={logo} alt="logo"/>
        <h3 className='Login'>Register below to start tracking your teams!</h3>
        <form className='Login form'>
          <p>
            Username
          </p>
          <input type="text" placeholder="Username" name='username' onChange={this.handleInput} />
          <p>
            Email
          </p>
          <input type="text" placeholder="Email" name="email" onChange={this.handleInput} />
          <p>
            Password
          </p>
          <input type="password" placeholder="Password" name='password' onChange={this.handleInput} />
        </form>
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
