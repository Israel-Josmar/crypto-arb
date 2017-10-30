
const request = require('request')

export const getAskPriceWex = (currency_pair ,callback) => {
  const uri = 'https://wex.nz/api/3/depth/'+currency_pair
  const options = { url: uri, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json[currency_pair].asks[0][0])
      }
    })
}

export const getBidPriceWex = (currency_pair ,callback) => {
  const uri = 'https://wex.nz/api/3/depth/'+currency_pair
  const options = { url: uri, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json[currency_pair].bids[0][0])
      }
    })
}

export const getPriceWex = (currency_pair ,callback) => {
  const uri = 'https://wex.nz/api/3/ticker/'+currency_pair
  const options = { url: uri, json: true }
  request(options, (error, response, json) => {
      if (!error && response.statusCode === 200) {
        callback(json[currency_pair].last)
      }
    })
}
