import React, { Component } from 'react';

class Login extends Component {
  constructor(){
    super();

    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this);
  }

  handleChange(){

  }

  login(){

  }

  render() {
    return (
      <div className="Login">
        Login
      </div>
    );
  }
}

export default Login;
