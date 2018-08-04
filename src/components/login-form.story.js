import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { LoginForm } from './login-form'

const formProps = {
  onSubmit: action('submit'),
}

storiesOf('Form', module)
  .add('Login form', () => <LoginForm {...formProps} />)
