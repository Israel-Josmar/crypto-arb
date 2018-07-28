import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { LoginPage } from './login-page'

import 'semantic-ui-css/semantic.min.css'

import './login-page.css'

storiesOf('Pages', module)
  .add('Login page', () => <LoginPage  />)
