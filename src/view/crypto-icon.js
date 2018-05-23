import React from 'react'

import { getCryptoLogo }  from './cryptos'

export const CryptoIcon = ({
  id,
}) => {
  return (
    <img src={getCryptoLogo(id)} alt=""/>
  )
}
