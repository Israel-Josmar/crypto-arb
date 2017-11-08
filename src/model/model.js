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

export const getSpread = (criptocurrency, exchange1, fiatcurrency1, exchange2, fiatcurrency2) => {
  let pricePromisse1 = {}
  let pricePromisse2 = {}
  const currency_pair1 = criptocurrency+'_'+fiatcurrency1
  const currency_pair2 = criptocurrency+'_'+fiatcurrency2
  switch (exchange1) {
  case 'wex':
    pricePromisse1 = getBRLPrice(currency_pair1, exchange1)
    break
  case 'braziliex':
    pricePromisse1 = getPrice(currency_pair1, exchange1)
    break
  case 'exmo':
    pricePromisse1 = getBRLPrice(currency_pair2, exchange1)
    break
  default:
  }
  switch (exchange2) {
  case 'wex':
    pricePromisse2 = getBRLPrice(currency_pair2, exchange2)
    break
  case 'braziliex':
    pricePromisse2 = getPrice(currency_pair2, exchange2)
    break
  case 'exmo':
    pricePromisse2 = getBRLPrice(currency_pair2, exchange2)
    break
  default:
  }
  return (
    Promise.all([pricePromisse1,pricePromisse2])
      .then((results) => 100*(results[0]/results[1]-1) )
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
      const profit = newBalance-value
      return profit
    })
  )
}

export const doArbitrage = (data) => {
  const deposit_fee = data.deposit_fee[0] + data.initial_value*(data.deposit_fee[1]/100)
  const value = data.initial_value - deposit_fee
  const criptocurrency = data.criptocurrency
  const fiatcurrency1 = data.exchange1.fiatcurrency
  const fiatcurrency2 = data.exchange2.fiatcurrency
  const exchange1 = data.exchange1.name
  const exchange2 = data.exchange2.name
  const commission1 = data.exchange1.commission
  const commission2 = data.exchange2.commission
  const withdraw_fee = data.exchange1.withdraw_fee
  const profit = getArbProfit(criptocurrency, fiatcurrency1, fiatcurrency2, exchange1, exchange2, commission1, commission2, withdraw_fee, value)
    .then((result) => {
      return {'profit': result, 'relative_profit': result/data.initial_value*100}
    })
  return profit
}
