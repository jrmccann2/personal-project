import React, { Component } from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
import {updateUser} from '../../dux/reducer';
import {connect} from 'react-redux';

import logo from '../../images/logo.png';
import settingsgear from '../../images/settings-gear.png';
import './Header.css'


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
        <div className="Header-wrapper">
          <div className='Header-content'>
            <h2 className='Header-user'>{username}</h2>
            <Link to='/dashboard'>
              <img className='logo' src={logo} alt='logo' />
            </Link>
            <div className='settings'>
              <h3 className='Header-signout' onClick={this.signout}>Sign Out</h3>
              <img className='Header-gear' src={settingsgear} alt='settings' onClick={ () => this.props.history.push('/settings')}/>
            </div>
          </div>
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
