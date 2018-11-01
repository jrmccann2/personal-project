import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../dux/reducer';

import logo from '../../images/logo.png';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.login = this.login.bind(this);
  }

  handleInput(event){
    this.setState({[event.target.name]: event.target.value})
  }

  async login(){
    // console.log(window)
    const {username, password} = this.state
    // console.log(username)
    axios.post('/api/login', {username, password})
      .then( async () => {
        // console.log(res)
        // console.log(window)
        // if(res.status === 200) {
        let resWithCoachId = await axios.get('/api/coach_session');
        // console.log(resWithCoachId)
        this.props.updateUser(resWithCoachId.data)
        // const {coach_id} = this.props.user
        this.props.history.push('/dashboard')
      })
      .catch( err => {
        alert('Password incorrect, stop trying to hack my site!');
        window.location.reload();
      })
  }

  render() {
    return (
      <div className="Login">
        <img src={logo} alt="logo"/>
        <h2>Welcome to And-one Analytics!</h2>
        <h3>Please Sign-In</h3>
        <hr/>
        <p>
            Username:
            <input type="text" placeholder="Username" name='username' onChange={this.handleInput} />
        </p>
        <p>
            Password:
            <input type="password" placeholder="Password" name='password' onChange={this.handleInput} />
        </p>
        <button className='btn' onClick={this.login}>Sign-In</button>
        <p>New user? Register <Link to='/register'>here</Link></p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect (mapStateToProps, {updateUser} ) (Login);
