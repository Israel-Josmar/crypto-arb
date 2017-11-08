import React from 'react'
import './App.css'
import {
  getPrice,
} from './model/model'


class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {exchange: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props._handleSubmit(this.state.exchange)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Exchange: </label>
          <input name="exchange" type="text" value={this.state.exchange} onChange={this.handleChange} />
          <br/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

class Panel extends React.Component {
  render() {
    return (
      <div>{this.props.value}</div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value : '',
    }
  }

  _handleSubmit(exchange) {
    const self = this
    getPrice('ltc_usd', exchange)
      .then((value) => {
        self.setState({
          value: value,
        })
        console.log(value)
      })
  }

  render () {
    return (
      <div>
        <Form _handleSubmit={(exchange) => this._handleSubmit(exchange)}/>
        <Panel value={this.state.value}/>
      </div>

    )
  }
}

export default App
