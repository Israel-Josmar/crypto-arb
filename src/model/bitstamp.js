import {
  bitstamp,
} from './config'

const request = require('request')

export const getAskPriceBitstamp = (currency_pair) => {
  const newCurrencyPair = currency_pair.replace('_','')
  const uri = bitstamp.host+bitstamp.ticker_uri+newCurrencyPair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.ask)
      }
    })
  })
}

export const getBidPriceBitstamp = (currency_pair) => {
  const newCurrencyPair = currency_pair.replace('_','')
  const uri = bitstamp.host+bitstamp.ticker_uri+newCurrencyPair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.bid)
      }
    })
  })
}

export const getPriceBitstamp = (currency_pair) => {
  const newCurrencyPair = currency_pair.replace('_','')
  const uri = bitstamp.host+bitstamp.ticker_uri+newCurrencyPair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.last)
      }
    })
  })
}
