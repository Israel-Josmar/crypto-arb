
const request = require('request')

export const getPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case exchange: 'braziliex'
        return getPriceBrex(currency_pair, callback)
      break;
    default:

  }
}

const getPriceBrex = (currency_pair ,callback) => {
  const link = '/public/ticker/'+currency_pair
  const options = { url: link, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json.last)
      }
    })
}
