import React from 'react'

function ExchangeCard(props) {
  return (
    <div className="card" style={props.style}>
      <div className="card-header">
        <span className="float-left">{props.profit}</span>
        <span className="float-right">{props.profitPercent}</span>
      </div>
      <div className="card-body">
        <img className="card-img-top" src="http://www.xbt.money/wp-content/uploads/2017/05/bitstampnewlogo.png" alt="Exchange Logo" />
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
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <label htmlFor="value">Value:</label>
              <input name="value" type="text"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Button className="btn btn-primary btn-sm" value="Simulate" />
            </div>
          </div>
          <div className="row">
            {
              this.cards.map((card, index) => (
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
