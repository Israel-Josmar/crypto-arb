import  React  from 'react'
import { shallow } from 'enzyme'

import { LoginForm } from './login-form'
import { Button, Form } from 'semantic-ui-react'

describe('<LoginForm /> component', () => {
  let root
  const mockCallBack = jest.fn()

  beforeAll(() => {
    root = shallow(<LoginForm onSubmit={mockCallBack} />)
  })

  test('should be defined', () => {
    expect(root.exists()).toBeTruthy()
  })

  test('should have Form component', () => {
    expect(root.find(Form)).toHaveLength(1)
  })

  test('should have Form.Input components', () => {
    expect(root.find(Form.Input)).toHaveLength(2)
  })

  test('should have password type Form.Input component', () => {
    expect(root.find({ type: 'password' })).toHaveLength(1)
  })

  test('should have Button component', () => {
    expect(root.find(Button)).toHaveLength(1)
  })

  test('should call prop when internal form submit', () => {
    const form = root.find(Form)
    const event = { preventDefault: () => {} }
    form.simulate('submit', event)
    expect(mockCallBack).toHaveBeenCalled()
  })
})
