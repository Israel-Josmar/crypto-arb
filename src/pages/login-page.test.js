import  React  from 'react'
import { shallow } from 'enzyme'

import { LoginPage } from './login-page'
import { LoginForm } from '../components/login-form'

describe('<LoginPage /> component', () => {
  let root

  beforeAll(() => {
    root = shallow(<LoginPage />)
  })

  test('should be defined', () => {
    expect(root.exists()).toBeTruthy()
  })

  test('should have LoginForm component', () => {
    expect(root.find(LoginForm)).toHaveLength(1)
  })
})
