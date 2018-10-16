import React, { Component } from 'react';

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.register = this.register.bind(this)
  }

  handleChange(){

  }

  register(){

  }

  render() {
    return (
      <div className="Register">
        Register
      </div>
    );
  }
}

export default Register;
