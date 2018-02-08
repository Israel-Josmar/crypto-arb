import React from 'react'

function InvestmentForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-row">
        <div className="col-auto">
          <div className="form-group">
            <label htmlFor="value">Investment Value</label>
            <input type="number" value={props.value} onChange={props.handleChange} className="form-control" id="value" name="value" placeholder="1000" />
            <label htmlFor="cost">Deposit Cost</label>
            <input type="number" value={props.cost} onChange={props.handleChange} className="form-control" id="cost" name="cost" placeholder="300" />
          </div>
        </div>
      </div>
      <Button className="btn btn-primary btn-sm" value="Simulate" />
    </form>
  )
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

function ExchangeCard(props) {
  const exchangeLogo = `${process.env.PUBLIC_URL}/imgLogos/${props.exchange.toLowerCase()}logo.png`
  return (
    <div className="card h-100" style={props.style}>
      <div className="card-header">
        <span className="float-left"><NumberDisplay value={props.profit} /></span>
        <span className="float-right"><NumberDisplay value={props.profitPercent} showAspercent="true"/></span>
      </div>
      <div className="card-body d-flex align-items-center">
        <img className="img-fluid" src={exchangeLogo} alt="Exchange Logo" />
      </div>
      <div className="card-footer text-muted">
        {props.criptocurrency}
      </div>
    </div>
  )
}
function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    this.fetchCardsData(this.state.value, this.state.cost)
  }

  fetchCardsData(value, cost) {
    const investedValue = value - cost
    fetch('/dashboard')
      .then(result => {
        result.json().then(result => {
          const data = result.map((card) => {
            const newProfit = card.profitPercent * investedValue
            return ({
              ...card,
              profit: newProfit - value,
              profitPercent: (newProfit / value - 1),
            })
          })
          this.setState({ cards: data })
        })
      })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row pb-2">
            <div className="col">
              <InvestmentForm value={this.state.value} cost={this.state.cost} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {
              this.state.cards.map((card, index) => (
                <div key={index}  className="w-25 p-1">
                  <ExchangeCard exchange={card.exchange} criptocurrency={card.coin} profit={card.profit} profitPercent={card.profitPercent} />
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
