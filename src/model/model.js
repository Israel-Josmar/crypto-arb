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

export const getPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
  case 'braziliex':
    getPriceBrex(currency_pair, callback)
    break
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

const convertBRLPriceWex = (currency_pair,callback) => {
  const p1 = getPriceWex(currency_pair)
  const p2 = usd_brl()
  Promise.all([p1,p2]).then((results) => {
    console.log(results[0]*results[1])
    return results[0]*results[1]
  })
}

export const getAskPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
  case 'braziliex':
    getAskPriceBrex(currency_pair, callback)
    break
  case 'wex':
    getAskPriceWex(currency_pair, callback)
    break
  default:

  }
}

export const getBidPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
  case 'braziliex':
    getBidPriceBrex(currency_pair, callback)
    break
  case 'wex':
    getBidPriceWex(currency_pair, callback)
    break
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
