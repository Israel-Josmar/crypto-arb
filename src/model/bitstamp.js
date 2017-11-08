
const request = require('request')

export const getAskPriceBitstamp = (currency_pair) => {
  const newCurrencyPair = currency_pair.replace('_','')
  const uri = 'https://www.bitstamp.net/api/v2/ticker/'+newCurrencyPair
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
  const uri = 'https://www.bitstamp.net/api/v2/ticker/'+newCurrencyPair
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
  const uri = 'https://www.bitstamp.net/api/v2/ticker/'+newCurrencyPair
  const options = { url: uri, json: true }
  return new Promise(function(resolve, reject) {
    request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        resolve(json.last)
      }
    })
  })
}
