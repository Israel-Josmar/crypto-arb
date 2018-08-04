import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { LoginPage } from './login-page'

storiesOf('Pages', module)
  .add('Login page', () => <LoginPage  />)
