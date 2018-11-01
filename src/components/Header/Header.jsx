import React, { Component } from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {updateUser} from '../../dux/reducer';
import {connect} from 'react-redux';

import logo from '../../images/logo.png';
import settingsgear from '../../images/settingsgear.jpg';


class Header extends Component {

  constructor(){
    super();

    this.signout = this.signout.bind(this)
  }

  signout(){
    axios.get('/api/signout')
        .then( () => {
          this.props.history.push('/') 
          this.props.updateUser({});
        })
  }

  render() {

    let {username} = this.props.user
    // console.log(this.props.location.pathname)
    // if(this.props.location.pathname === '/'){
    //   return null
    // } else if (this.props.location.pathname === '/register') {
    //   return null
    // } else {
      return (
        <div className="Header">
          <div>{username}</div>
          <Link to='/dashboard'>
            <img src={logo} alt='logo' />
          </Link>
          <div onClick={this.signout}>Sign Out</div>
          <img src={settingsgear} alt='settings' onClick={ () => this.props.history.push('/settings')}/>
        </div>
      );
    // }
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect ( mapStateToProps, {updateUser} ) (withRouter(Header));
