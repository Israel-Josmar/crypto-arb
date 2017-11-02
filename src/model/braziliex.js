
const request = require('request')

export const getAskPriceBrex = (currency_pair) => {
  const uri = 'https://braziliex.com/api/v1/public/orderbook/'+currency_pair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.asks[0].price)
      }
    })
  })
}

export const getBidPriceBrex = (currency_pair) => {
  const uri = 'https://braziliex.com/api/v1/public/orderbook/'+currency_pair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.bids[0].price)
      }
    })
  })
}

export const getPriceBrex = (currency_pair) => {
  const uri = 'https://braziliex.com/api/v1/public/ticker/'+currency_pair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.last)
      }
    })
  })
}
