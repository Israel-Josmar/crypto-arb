import React, { Component } from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import DashBoard from './pages/dashboard'
import './App.css'

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <DashBoard />
    )
  }
}

export default withAuthenticator(App)
