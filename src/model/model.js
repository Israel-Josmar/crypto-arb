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

export const getPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case 'braziliex':
        getPriceBrex(currency_pair, callback)
      break;
    case 'wex':
        getPriceWex(currency_pair, callback)
      break;
    default:

  }
}

export const getAskPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case 'braziliex':
        getAskPriceBrex(currency_pair, callback)
      break;
    case 'wex':
        getAskPriceWex(currency_pair, callback)
     break;
    default:

  }
}

export const getBidPrice = (currency_pair, exchange, callback) => {
  switch (exchange) {
    case 'braziliex':
        getBidPriceBrex(currency_pair, callback)
      break;
    case 'wex':
        getBidPriceWex(currency_pair, callback)
      break;
    default:

  }
}
