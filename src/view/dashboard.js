import React from 'react'
import { Cryptocurrency } from './crypto-currency'
import { Button, Form } from 'semantic-ui-react'

class InvestmentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hidden: true,
      value: 1000,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClick(value) {
    const hidden = (value === 0) ? !this.state.hidden : true
    this.setState({
      hidden: hidden,
      value: (hidden) ? value : 1000,
    })
  }

  handleChange(event) {
    const target = event.target
    const name =  target.name

    this.setState({
      [name]: target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit(this.state.value)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div class="alert alert-info" role="alert">
          Investment values after bank fees
        </div>
        <Button.Group>
          <Button onClick={() => this.handleClick(1000)}>1000</Button>
          <Button onClick={() => this.handleClick(5000)}>5000</Button>
          <Button onClick={() => this.handleClick(10000)}>10000</Button>
          <Button type="button" onClick={() => this.handleClick(0)}>Custom Value</Button>
        </Button.Group>
        {this.state.hidden ? (
          ''
        ) : (
          <React.Fragment>
            <Form.Input style={{ width: '110px' }} label="Investment Value" type="number" value={this.state.value} onChange={this.handleChange} id="value" name="value" placeholder="1000" />
            <Button>Simulate</Button>
          </React.Fragment>
        )}
      </Form>
    )
  }
}

const NumberDisplay = ({
  value,
  showAspercent,
  precision,
}) => {
  const className = (value >= 0) ? 'text-success' : 'text-danger'
  const number = showAspercent ? value * 100 : value
  const displayedNumber = precision ? number.toFixed(precision) : number.toFixed(2)

  return (
    <div className={className}>
      {showAspercent ? `${displayedNumber}%` : displayedNumber}
    </div>
  )
}

const ExchangeCard = ({
  exchangeFrom,
  exchangeTo,
  profit,
  profitPercent,
  criptocurrency,
}) => {
  const style = {
    width: '240px',
    height: '208px',
  }
  return (
    <div className="card" style={style}>
      <div className="card-header d-flex flex-column">
        <span className="align-self-center"><Cryptocurrency id={criptocurrency}/></span>
      </div>
      <div className="card-body d-flex align-items-center" >
        <div className="d-flex mr-auto"><span style={{ color: '#28a745' }}>R$&nbsp;</span><NumberDisplay value={profit} /></div>
        <div className="ml-auto"><NumberDisplay value={profitPercent} showAspercent="true"/></div>
      </div>
      <div className="card-footer text-muted d-flex">
        <span className="">{exchangeFrom}</span>
        <span className="mx-auto">{'=>'}</span>
        <span className="">{exchangeTo}</span>
      </div>
    </div>
  )
}

class DashBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      cost: '',
      cards: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(value) {
    this.fetchCardsData(value)
  }

  async fetchCardsData(value) {
    const response = await fetch(`/dashboard?amount=${value}&currency=brl`)
    const result = await response.json()
    const data = result.map((card) => {
      const profitPercent = card.profitPercent - 1
      const profit = profitPercent * value
      return ({
        ...card,
        profit: profit,
        profitPercent: profit / value,
      })
    })
    this.setState({ cards: data })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row pb-2">
            <div className="col">
              <InvestmentForm value={this.state.value} cost={this.state.cost} handleSubmit={this.handleSubmit} />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {
              this.state.cards.map((card, index) => (
                <div key={index} className="p-1">
                  <ExchangeCard exchangeFrom={card.sourceName} exchangeTo={card.destName}  criptocurrency={card.coin} profit={card.profit} profitPercent={card.profitPercent} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DashBoard
