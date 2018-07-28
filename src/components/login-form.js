import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

export class LoginForm extends Component {
    state = {}

    handleUsernameChange = (e, { value }) => {
      this.setState({
        username: value,
      })
    }

    handlePasswordChange = (e, { value }) => {
      this.setState({
        password: value,
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.props.onSubmit(this.state.username || '', this.state.password || '')
    }

    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label="Login" onChange={this.handleUsernameChange} />
          <Form.Input type="password" label="Password" onChange={this.handlePasswordChange} />
          <Button>Login</Button>
        </Form>
      )
    }
}
