import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from "aws-amplify"
import './index.css'
import App from './App'

import config from "./config"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "dashboard",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ]
  }
})


ReactDOM.render(<App />, document.getElementById('root'))
