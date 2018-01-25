import React from 'react'

function ExchangeCard(props) {
  const exchangeLogo = `${process.env.PUBLIC_URL}/imgLogos/${props.exchange.toLowerCase()}logo.png`
  return (
    <div className="card" style={props.style}>
      <div className="card-header">
        <span className="float-left">{props.profit}</span>
        <span className="float-right">{props.profitPercent}</span>
      </div>
      <div className="card-body">
        <img className="card-img-top" src={exchangeLogo} alt="Exchange Logo" />
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
    this.cards =  [
      {
        exchange: 'Exchange2', coin: 'Litecoin', profit: '400.00', profitPercent: '4%',
      },
      {
        exchange: 'Exchange1', coin: 'Litecoin', profit: '500.00', profitPercent: '5%',
      },
      {
        exchange: 'Exchange3', coin: 'Litecoin', profit: '300.00', profitPercent: '3%',
      },
      {
        exchange: 'Exchange4', coin: 'Litecoin', profit: '200.00', profitPercent: '2%',
      },
      {
        exchange: 'Exchange5', coin: 'Litecoin', profit: '100.00', profitPercent: '1%',
      },
    ]
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
    const data = this.fetchCardsData(this.state.value, this.state.cost)
    this.setState({ cards: data })
  }

  fetchCardsData(value, cost) {
    return this.cards
    // return fetchAPI(value, cost)
  }

  render() {
    const sortedCards = this.state.cards.sort(function (a, b) {
      const nameA = a.profitPercent.toLowerCase()
      const nameB = b.profitPercent.toLowerCase()
      if (nameA > nameB) return -1
      if (nameA < nameB) return 1
      return 0 // default return value (no sorting)
    })
    return (
      <div>
        <div className="container">
          <div className="row pb-2">
            <div className="col">
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <div className="col-auto">
                    <div className="form-group">
                      <label htmlFor="value">Investment Value</label>
                      <input type="number" value={this.state.value} onChange={this.handleChange} className="form-control" id="value" name="value" placeholder="1000" />
                      <label htmlFor="cost">Deposit Cost</label>
                      <input type="number" value={this.state.cost} onChange={this.handleChange} className="form-control" id="cost" name="cost" placeholder="300" />
                    </div>
                  </div>
                </div>
                <Button className="btn btn-primary btn-sm" value="Simulate" />
              </form>
            </div>
          </div>
          <div className="row">
            {
              sortedCards.map((card, index) => (
                <div key={index}  className="col">
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
