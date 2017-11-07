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

import {
  getPriceExmo,
  getAskPriceExmo,
  getBidPriceExmo,
} from './exmo'

const request = require('request')

export const getPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'braziliex':
    return getPriceBrex(currency_pair)
  case 'wex':
    return getPriceWex(currency_pair)
  case 'exmo':
    return getPriceExmo(currency_pair)
  default:

  }
}

export const getBRLPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'wex':
    return convertBRLPriceWex(currency_pair)
  case 'exmo':
    return convertBRLPriceExmo(currency_pair)
  default:

  }
}

const convertBRLPriceWex = (currency_pair) => {
  const pricePromisse =  getPriceWex(currency_pair)
  const valuePromisse = usd_brl()
  return (
    Promise.all([pricePromisse,valuePromisse])
      .then((results) => results[0]*results[1])
  )
}

const convertBRLPriceExmo = (currency_pair) => {
  const pricePromisse =  getPriceExmo(currency_pair)
  const valuePromisse = usd_brl()
  return (
    Promise.all([pricePromisse,valuePromisse])
      .then((results) => results[0]*results[1])
  )
}

export const getAskPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'braziliex':
    return getAskPriceBrex(currency_pair)
  case 'wex':
    return getAskPriceWex(currency_pair)
  case 'exmo':
    return getAskPriceExmo(currency_pair)
  default:

  }
}

export const getBidPrice = (currency_pair, exchange) => {
  switch (exchange) {
  case 'braziliex':
    return getBidPriceBrex(currency_pair)
  case 'wex':
    return getBidPriceWex(currency_pair)
  case 'exmo':
    return getBidPriceExmo(currency_pair)
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

export const getSpreadBrFr = (criptocurrency, exchangeBR, fiatcurrency, exchangeFR) => {
  const brlPricePromisse = getBRLPrice(criptocurrency+'_'+fiatcurrency, exchangeFR)
  const pricePromisse = getPrice(criptocurrency+'_brl', exchangeBR)
  return (
    Promise.all([brlPricePromisse,pricePromisse])
      .then((results) => 100*(results[1]/results[0]-1) )
  )
}

export const getFinalPrice = (criptocurrency, fiatcurrency, exchange, commission, operation) => {
  const currency_pair = criptocurrency+'_'+fiatcurrency
  let pricePromisse = {}
  switch (exchange) {
  case 'wex':
    pricePromisse = getBRLPrice(currency_pair, exchange)
    break
  case 'braziliex':
    pricePromisse = getPrice(currency_pair, exchange)
    break
  case 'exmo':
    pricePromisse = getBRLPrice(currency_pair, exchange)
    break
  default:

  }
  return (
    pricePromisse.then((price) => {
      if (operation === 'buy')
        return price*(1+(commission/100))
      else
        return price*(1-(commission/100))
    })
  )
}

export const getArbProfit = (criptocurrency, fiatcurrency1, fiatcurrency2, exchange1, exchange2, commission1, commission2, transfer_fee, value) => {
  const pricePromisse1 = getFinalPrice(criptocurrency, fiatcurrency1, exchange1, commission1, 'buy')
  const pricePromisse2 = getFinalPrice(criptocurrency, fiatcurrency2, exchange2, commission2, 'sell')
  return (
    Promise.all([pricePromisse1, pricePromisse2]).then((results) => {
      const criptoAmount = value/results[0]
      const criptoTransferred = criptoAmount - transfer_fee
      const newBalance = criptoTransferred*results[1]
      const profit = newBalance/value - 1
      return profit*100
    })
  )
}
