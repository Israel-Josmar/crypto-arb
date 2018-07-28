import React from 'react'
import { CryptoIcon } from './crypto-icon'
import * as cryptos from './cryptos'

export const Cryptocurrency = ({ id }) => (
  <React.Fragment>
    <CryptoIcon id={id} />
    <span className="ml-1">{cryptos.names[id]}</span>
  </React.Fragment>
)
