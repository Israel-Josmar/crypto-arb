
const request = require('request')

export const getPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case 'braziliex':
        getPriceBrex(currency_pair, callback)
      break;
    default:

  }
}

export const getAskPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case 'braziliex':
        getAskPriceBrex(currency_pair, callback)
      break;
    default:

  }
}

export const getBidPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case 'braziliex':
        getBidPriceBrex(currency_pair, callback)
      break;
    default:

  }
}

const getAskPriceBrex = (currency_pair ,callback) => {
  const uri = 'https://braziliex.com/api/v1/public/orderbook/'+currency_pair
  const options = { url: uri, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json.asks[0].price)
      }
    })
}

const getBidPriceBrex = (currency_pair ,callback) => {
  const uri = 'https://braziliex.com/api/v1/public/orderbook/'+currency_pair
  const options = { url: uri, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json.bids[0].price)
      }
    })
}

const getPriceBrex = (currency_pair ,callback) => {
  const uri = 'https://braziliex.com/api/v1/public/ticker/'+currency_pair
  const options = { url: uri, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json.last)
      }
    })
}
