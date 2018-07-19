import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

export class InvestmentForm extends Component {
  state = {
    selectedAmount: 1000,
    customAmount: 1000,
  }

  handleClick = (e, { value }) => {
    this.setState({
      selectedAmount: value,
    }, this.handleSubmit)
  }

  handleClickCustomAmount = () => {
    this.setState({
      selectedAmount: undefined,
    })
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState({
      customAmount: value,
    })
  }

  handleSubmit = () => {
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
