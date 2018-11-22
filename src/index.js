import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from 'aws-amplify'
import './index.css'
import App from './App'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID,
  },
  Storage: {
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'dashboard',
        endpoint: process.env.REACT_APP_URL,
        region: process.env.REACT_APP_REGION,
      },
    ],
  },
})

ReactDOM.render(<App />, document.getElementById('root'))
