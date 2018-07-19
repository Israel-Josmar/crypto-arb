import React from 'react'
import { Cryptocurrency } from './crypto-currency'
import { NumberDisplay } from './number-display'

import './exchange-card.css'

export const ExchangeCard = ({
  exchangeFrom,
  exchangeTo,
  profit,
  profitPercent,
  criptocurrency,
}) => {
  return (
    <div className="card" >
      <div className="card-header d-flex flex-column">
        <span className="align-self-center"><Cryptocurrency id={criptocurrency}/></span>
      </div>
      <div className="card-body d-flex align-items-center" >
        <div className="d-flex mr-auto"><span className="profit">R$&nbsp;</span><NumberDisplay value={profit} /></div>
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
