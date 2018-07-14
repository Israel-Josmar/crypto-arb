import React from 'react'
import { InvestmentForm } from '../components/investment-form'
import { ExchangeCard } from '../components/exchange-card'

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
