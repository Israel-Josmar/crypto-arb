import  React  from 'react'
import { shallow } from 'enzyme'

import { LoginPage } from './login-page'
import { LoginForm } from '../components/login-form'

describe('<LoginPage /> component', () => {
  let root

  const mockCallBack = jest.fn()

  beforeAll(() => {
    root = shallow(<LoginPage onLogin={mockCallBack}/>)
  })

  test('should be defined', () => {
    expect(root.exists()).toBeTruthy()
  })

  test('should have LoginForm component', () => {
    expect(root.find(LoginForm)).toHaveLength(1)
  })

  test('should call onLogin prop on LoginForm submit', async () => {
    const form = root.find(LoginForm)
    await form.prop('onSubmit')()
    expect(mockCallBack).toHaveBeenCalled()
  })
})
