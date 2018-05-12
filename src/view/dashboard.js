import React from 'react'

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
  handleClick(e) {
    const hidden = (e.target.id === 'customLabel') ? !this.state.hidden : true
    this.setState({
      hidden: hidden,
      value: (hidden) ? e.target.id : 1000,
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
      <form onSubmit={this.handleSubmit}>
        <div class="alert alert-info" role="alert">
          Investment values after bank fees
        </div>
        <div className="form-row">
          <div className="col-auto">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary btn-sm border active" id="1000" onClick={this.handleClick} >
                <input type="radio" name="options" /> 1000
              </label>
              <label className="btn btn-secondary btn-sm border" id="5000" onClick={this.handleClick}>
                <input type="radio" name="options" /> 5000
              </label>
              <label className="btn btn-secondary btn-sm border" id="10000"  onClick={this.handleClick}>
                <input type="radio" name="options" /> 10000
              </label>
              <label id="customLabel" className="btn btn-secondary btn-sm border" onClick={this.handleClick}>
                <input type="radio" name="options" />Custom Value
              </label>

            </div>
            {this.state.hidden ? (
              ''
            ) : (
              <div className="form-row">

                <div className="col-auto">
                  <div className="form-group">
                    <label htmlFor="value">Investment Value</label>
                    <input type="number" value={this.state.value} onChange={this.handleChange} className="form-control" id="value" name="value" placeholder="1000" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button className="btn btn-primary btn-sm" value="Simulate" />
      </form>
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
    width: '200px',
    height: '100px',
  }
  return (
    <div className="card h-100">
      <div className="card-header d-flex flex-column">
        <span className="align-self-center">{criptocurrency}</span>
      </div>
      <div className="card-body d-flex align-items-center" style={style}>
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

const  Button = ({
  className,
  onClick,
  value,
}) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(value) {
    this.fetchCardsData(value)
  }

  fetchCardsData(value) {
    fetch(`/dashboard?amount=${value}&currency=brl`)
      .then(result => {
        result.json().then(result => {
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
        })
      })
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
