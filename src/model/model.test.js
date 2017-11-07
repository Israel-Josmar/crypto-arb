import {
  getPrice,
  getAskPrice,
  getBidPrice,
  usd_brl,
  getBRLPrice,
  getSpread,
  getFinalPrice,
  getArbProfit,
} from './model'

var nock = require('nock')

test('get latest traded price from braziliex', () => {
  nock('https://braziliex.com')
    .get('/api/v1/public/ticker/ltc_brl')
    .reply(200, {'last':'185.00000000'})
  return expect(getPrice('ltc_brl','braziliex')).resolves.toEqual('185.00000000')
})

test('get best ask price from braziliex', () => {
  nock('https://braziliex.com')
    .get('/api/v1/public/orderbook/ltc_brl')
    .reply(200, {'asks': [{'price':189}]})
  return expect(getAskPrice('ltc_brl','braziliex')).resolves.toEqual(189)
})

test('get best bid price from braziliex', () => {
  nock('https://braziliex.com')
    .get('/api/v1/public/orderbook/ltc_brl')
    .reply(200, {'bids': [{'price':183}]})
  expect(getBidPrice('ltc_brl','braziliex')).resolves.toEqual(183)
})

test('shows get latest traded price from Wex', () => {
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {'ltc_usd':{'last':56.14505}})
  return expect(getPrice('ltc_usd','wex')).resolves.toEqual(56.14505)
})

test('get best ask price from Wex', () => {
  nock('https://wex.nz')
    .get('/api/3/depth/ltc_usd')
    .reply(200, {'ltc_usd':{'asks': [[56.4]]}})
  return expect(getAskPrice('ltc_usd','wex')).resolves.toEqual(56.4)
})

test('get best bid price from Wex', () => {
  nock('https://wex.nz')
    .get('/api/3/depth/ltc_usd')
    .reply(200, {'ltc_usd':{'bids': [[56.140001]]}})
  return expect(getBidPrice('ltc_usd','wex')).resolves.toEqual(56.140001)
})

test('get usd x brl', () => {
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(usd_brl()).resolves.toEqual(3.271397)
})

test('convert last traded price at wex to brl', () => {
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {
      'ltc_usd':{'last':56.14505},
    })
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(getBRLPrice('ltc_usd','wex')).resolves.toEqual(183.67274813485)
})

test('get spread between two exchanges', () => {
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {
      'ltc_usd':{'last':56.14505},
    })
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  nock('https://braziliex.com')
    .get('/api/v1/public/ticker/ltc_brl')
    .reply(200, {'last':'185.00000000'})
  return expect(getSpread('ltc', 'braziliex', 'brl', 'wex', 'usd')).resolves.toEqual(0.7226177419502378)
})

test('get price with trade commission', () => {
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {
      'ltc_usd':{'last':56.14505},
    })
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(getFinalPrice('ltc', 'usd', 'wex', 0.2)).resolves.toEqual(183.3054026385803)
})

test('get trade profit', () => {
  nock('https://braziliex.com')
    .get('/api/v1/public/ticker/ltc_brl')
    .reply(200, {'last':'185.00000000'})
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {
      'ltc_usd':{'last':56.14505},
    })
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(getArbProfit('ltc', 'brl', 'usd', 'braziliex', 'wex', 0.01, 0.2, 0.001, 1000)).resolves.toEqual(-0.9442365234059391)
})

test('get latest traded price from Exmo', () => {
  nock('https://api.exmo.com')
    .get('/v1/ticker/')
    .reply(200, {'LTC_USD':{'last_trade':56.14505}})
  return expect(getPrice('ltc_usd','exmo')).resolves.toEqual(56.14505)
})

test('get best ask price from Exmo', () => {
  nock('https://api.exmo.com')
    .get('/v1/order_book/?pair=LTC_USD')
    .reply(200, {'LTC_USD':{'ask_top':56.4}})
  return expect(getAskPrice('ltc_usd','exmo')).resolves.toEqual(56.4)
})

test('get best bid price from Exmo', () => {
  nock('https://api.exmo.com')
    .get('/v1/order_book/?pair=LTC_USD')
    .reply(200, {'LTC_USD':{'bid_top':56.140001}})
  return expect(getBidPrice('ltc_usd','exmo')).resolves.toEqual(56.140001)
})

test('convert last traded price at Exmo to brl', () => {
  nock('https://api.exmo.com')
    .get('/v1/ticker/')
    .reply(200, {'LTC_USD':{'last_trade':56.14505}})
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(getBRLPrice('ltc_usd','exmo')).resolves.toEqual(183.67274813485)
})

test('get price with trade commission', () => {
  nock('https://api.exmo.com')
    .get('/v1/ticker/')
    .reply(200, {'LTC_USD':{'last_trade':56.14505}})
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(getFinalPrice('ltc', 'usd', 'exmo', 0.2)).resolves.toEqual(183.3054026385803)
})
