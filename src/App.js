import React, { Component } from 'react'
import { Auth } from "aws-amplify";
import { withAuthenticator } from 'aws-amplify-react';
import DashBoard from './pages/dashboard'
import './App.css'

import 'semantic-ui-css/semantic.min.css'
import { LoginPage } from './pages/login-page';

class App extends Component {

  state = {
    isAuthenticated: false
  }

  onLogin = (isAuthenticated) => {
    this.setState({
      isAuthenticated: isAuthenticated
    })
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.setState({
          isAuthenticated: true
        })
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        console.log(e);
      }
    }
  
  }
  

  render() {
    return (
      <DashBoard />
    )
  }
}

export default withAuthenticator(App)
