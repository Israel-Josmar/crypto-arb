import React from 'react'

import * as Cryptos from './cryptos'

export const CryptoIcon = ({
  id,
}) => {
  return (
    // eslint-disable-next-line
    <img src={Cryptos.logos[id]} alt=""/>
  )
}
