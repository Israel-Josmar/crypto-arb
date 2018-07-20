import React from 'react'
import { InvestmentForm } from '../components/investment-form'
import { ExchangeCard } from '../components/exchange-card'
import { fetchCardsData } from '../services/dashboard-service'

class DashBoard extends React.Component {
  state = {
    value: '',
    cost: '',
    cards: [],
  }

  handleSubmit = async (value) => {
    const data = await fetchCardsData(value)
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
