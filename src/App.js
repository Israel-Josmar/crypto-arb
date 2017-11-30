import React from 'react'
import './App.css'
import {
  doArbitrage,
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
    const exchange1 = {
      'name': this.state.exchange1,
      'commission': this.state.commission1,
      'withdraw_fee': this.state.withdraw_fee1,
      'fiatcurrency': this.state.fiatcurrency1,
    }
    const exchange2 = {
      'name': this.state.exchange2,
      'commission': this.state.commission2,
      'withdraw_fee': [this.state.withdraw_fee2, this.state.withdraw_fee2_p],
      'fiatcurrency': this.state.fiatcurrency2,
    }
    const data = {
      'initial_value': this.state.deposit,
      'deposit_currency': this.state.deposit_currency,
      'deposit_fee': [this.state.deposit_fee, this.state.deposit_fee_p],
      'criptocurrency': this.state.criptocurrency,
      'exchange1': exchange1,
      'exchange2': exchange2,
    }
    this.props._handleSubmit(data)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="exchange1">Exchange1: </label>
          <input id="exchange1" name="exchange1" type="text" value={this.state.exchange1} onChange={this.handleChange} /><br />
          <label htmlFor="commission1">Comission: </label>
          <input id="commission1" name="commission1" type="text" value={this.state.commission1} onChange={this.handleChange} /><br />
          <label htmlFor="withdraw_fee1">Withdraw Fee: </label>
          <input id="withdraw_fee1" name="withdraw_fee1" type="text" value={this.state.withdraw_fee1} onChange={this.handleChange} /><br />
          <label htmlFor="fiatcurrency1">Fiat Currency: </label>
          <input id="fiatcurrency1" name="fiatcurrency1" type="text" value={this.state.fiatcurrency1} onChange={this.handleChange} /><br />
          <br />
          <label htmlFor="exchange2">Exchange2: </label>
          <input id="exchange2" name="exchange2" type="text" value={this.state.exchange2} onChange={this.handleChange} /><br />
          <label htmlFor="commission2">Comission: </label>
          <input id="commission2" name="commission2" type="text" value={this.state.commission2} onChange={this.handleChange} /><br />
          <label htmlFor="withdraw_fee2">Withdraw Fee: </label>
          <input id="withdraw_fee2" name="withdraw_fee2" type="text" value={this.state.withdraw_fee2} onChange={this.handleChange} /><br />
          <label htmlFor="withdraw_fee2_p">Withdraw Fee (%): </label>
          <input id="withdraw_fee2_p" name="withdraw_fee2_p" type="text" value={this.state.withdraw_fee2_p} onChange={this.handleChange} /><br />
          <label htmlFor="fiatcurrency2">Fiat Currency: </label>
          <input id="fiatcurrency2" name="fiatcurrency2" type="text" value={this.state.fiatcurrency2} onChange={this.handleChange} /><br />
          <br/>
          <label htmlFor="deposit">Deposit Value: </label>
          <input id="deposit" name="deposit" type="text" value={this.state.deposit} onChange={this.handleChange} /><br />
          <label htmlFor="deposit_currency">Deposit Currency: </label>
          <input id="deposit_currency" name="deposit_currency" type="text" value={this.state.deposit_currency} onChange={this.handleChange} /><br />
          <label htmlFor="deposit_fee">Deposit Fee: </label>
          <input id="deposit_fee" name="deposit_fee" type="text" value={this.state.deposit_fee} onChange={this.handleChange} /><br />
          <label htmlFor="deposit_fee_p">Deposit Fee (%): </label>
          <input id="deposit_fee_p" name="deposit_fee_p" type="text" value={this.state.deposit_fee_p} onChange={this.handleChange} /><br />
          <label htmlFor="criptocurrency">Criptocurrency: </label>
          <input id="criptocurrency" name="criptocurrency" type="text" value={this.state.criptocurrency} onChange={this.handleChange} /><br />
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

  _handleSubmit(data) {
    const self = this
    doArbitrage(data)
      .then((value) => {
        self.setState({
          value: 'Profit: '+value.profit+' - '+value.relative_profit+'%',
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
