import React, { Component } from 'react'
import { LoginForm } from '../components/login-form'
import { login } from '../services/login-service'

import './login-page.css'

export class LoginPage extends Component {
  state = {
    user_name: '',
  }

  handleSubmit = async (username, password) => {
    const response = await login(username, password)
    this.setState({
      user_name: response.user_name,
    })
  }

  render() {
    return (
      <div className="login-form">
        <LoginForm onSubmit={this.handleSubmit}/>
        {this.state.user_name}
      </div>
    )
  }
}
