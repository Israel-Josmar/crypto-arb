import {
  exmo,
} from './config'

const request = require('request')

export const getPriceExmo = (currency_pair) => {
  const uri = exmo.host+exmo.ticker_uri
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json[currency_pair.toUpperCase()].last_trade)
      }
    })
  })
}

export const getAskPriceExmo = (currency_pair) => {
  const uri = exmo.host+exmo.orderbook_uri+currency_pair.toUpperCase()
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json[currency_pair.toUpperCase()].ask_top)
      }
    })
  })
}

export const getBidPriceExmo = (currency_pair) => {
  const uri = exmo.host+exmo.orderbook_uri+currency_pair.toUpperCase()
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json[currency_pair.toUpperCase()].bid_top)
      }
    })
  })
}
