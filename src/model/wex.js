import {
  wex,
} from './config'

const request = require('request')

export const getAskPriceWex = (currency_pair) => {
  const uri = wex.host+wex.depth_uri+currency_pair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json[currency_pair].asks[0][0])
      }
    })
  })
}

export const getBidPriceWex = (currency_pair) => {
  const uri = wex.host+wex.depth_uri+currency_pair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json[currency_pair].bids[0][0])
      }
    })
  })
}

export const getPriceWex = (currency_pair) => {
  const uri = wex.host+wex.ticker_uri+currency_pair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json[currency_pair].last)
      }
    })
  })
}
