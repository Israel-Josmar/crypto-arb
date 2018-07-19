import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

export class InvestmentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAmount: 1000,
      customAmount: 1000,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClickCustomAmount = this.handleClickCustomAmount.bind(this)
  }

  handleClick(e, { value }) {
    this.setState({
      selectedAmount: value,
    }, this.handleSubmit)
  }

  handleClickCustomAmount() {
    this.setState({
      selectedAmount: undefined,
    })
  }

  handleChange(event) {
    const target = event.target
    this.setState({
      customAmount: target.value,
    })
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.selectedAmount || this.state.customAmount)
  }

  render() {
    return (
      <Form>
        <Message color="blue">
          Investment values after bank fees
        </Message>
        <Button.Group>
          <Button type="button" onClick={this.handleClick} value="1000">1000</Button>
          <Button type="button" onClick={this.handleClick} value="5000">5000</Button>
          <Button type="button" onClick={this.handleClick} value="10000">10000</Button>
          <Button type="button" onClick={this.handleClickCustomAmount}>Custom Value</Button>
        </Button.Group>
        {!this.state.selectedAmount && (
          <React.Fragment>
            <Form.Input style={{ width: '110px' }} label="Investment Value" type="number" value={this.state.customAmount} onChange={this.handleChange} id="value" name="value" placeholder="1000" />
            <Button type="button" onClick={this.handleSubmit}>Simulate</Button>
          </React.Fragment>
        )}
      </Form>
    )
  }
}
