import {
  getPriceBrex,
  getAskPriceBrex,
  getBidPriceBrex,
} from './braziliex'

import {
  getPriceWex,
  getAskPriceWex,
  getBidPriceWex,
} from './wex'

const request = require('request')
const Promise = require('promise')

export const getPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'braziliex':
    return getPriceBrex(currency_pair)
  case 'wex':
    return getPriceWex(currency_pair)
  default:

  }
}

export const getBRLPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'wex':
    return convertBRLPriceWex(currency_pair)
  default:

  }
}

const convertBRLPriceWex = (currency_pair) => {
  return getPriceWex(currency_pair).then((price) => {
    return usd_brl().then((value) => {
      return(value*price)
    })
  })
}

export const getAskPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'braziliex':
    return getAskPriceBrex(currency_pair)
  case 'wex':
    return getAskPriceWex(currency_pair)
  default:

  }
}

export const getBidPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'braziliex':
    return getBidPriceBrex(currency_pair)
  case 'wex':
    return getBidPriceWex(currency_pair)
  default:

  }
}

export const usd_brl = () => {
  const uri = 'http://free.currencyconverterapi.com/api/v3/convert?q=USD_BRL&compact=y'
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.USD_BRL.val)
      }
    })
  })
}
