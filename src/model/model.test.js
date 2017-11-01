import {
  getPrice,
  getAskPrice,
  getBidPrice,
  usd_brl,
  getBRLPrice,
} from './model'

var nock = require('nock')

test('convert last traded price to brl', () => {
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {
      'ltc_usd':{
        'high':57.49874,
        'low':56.1,
        'avg':56.79937,
        'vol':2898159.59804,
        'vol_cur':51161.35503,
        'last':56.14505,
        'buy':56.19,
        'sell':56.1001,
        'updated':1509476866},
    })
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  expect(getBRLPrice('ltc_usd','wex')).toEqual(183.67274813485)
})

test('shows get latest traded price', (done) => {
  nock('https://braziliex.com')
    .get('/api/v1/public/ticker/ltc_brl')
    .reply(200, {
      'active':1,
      'market':'ltc_brl',
      'last':'185.00000000',
      'percentChange':'-5.12',
      'baseVolume24':'86.056',
      'quoteVolume24':'15974.032',
      'baseVolume':'86.056',
      'quoteVolume':'15974.032',
      'highestBid24':'194.99000000',
      'lowestAsk24':'180.01000000',
      'highestBid':'182.05000000',
      'lowestAsk':'189.00000000',
    })
  getPrice('ltc_brl','braziliex', (lastPrice) => {
    expect(lastPrice).toEqual('185.00000000')
    done()
  })
})

test('get best ask price', (done) => {
  nock('https://braziliex.com')
    .get('/api/v1/public/orderbook/ltc_brl')
    .reply(200, {
      'asks': [{'price':189,'amount':0.97583199},{'price':189.01,'amount':1.7616879}],
    })
  getAskPrice('ltc_brl','braziliex', (askPrice) => {
    expect(askPrice).toEqual(189)
    done()
  })
})

test('get best bid price', (done) => {
  nock('https://braziliex.com')
    .get('/api/v1/public/orderbook/ltc_brl')
    .reply(200, {
      'bids': [{'price':183,'amount':9.86295081},{'price':182.01,'amount':5}],
    })
  getBidPrice('ltc_brl','braziliex', (askPrice) => {
    expect(askPrice).toEqual(183)
    done()
  })
})

test('shows get latest traded price at Wex', () => {
  nock('https://wex.nz')
    .get('/api/3/ticker/ltc_usd')
    .reply(200, {
      'ltc_usd':{
        'high':57.49874,
        'low':56.1,
        'avg':56.79937,
        'vol':2898159.59804,
        'vol_cur':51161.35503,
        'last':56.14505,
        'buy':56.19,
        'sell':56.1001,
        'updated':1509476866},
    })
  return expect(getPrice('ltc_usd','wex')).resolves.toEqual(56.14505)
})

test('get best ask price at Wex', (done) => {
  nock('https://wex.nz')
    .get('/api/3/depth/ltc_usd')
    .reply(200, {
      'ltc_usd':{
        'asks': [[56.4,0.1536],[56.478965,7.44058789]],
      },
    })
  getAskPrice('ltc_usd','wex', (askPrice) => {
    expect(askPrice).toEqual(56.4)
    done()
  })
})

test('get best bid price at Wex', (done) => {
  nock('https://wex.nz')
    .get('/api/3/depth/ltc_usd')
    .reply(200, {
      'ltc_usd':{
        'bids': [[56.140001,0.533677],[56.14,0.36877119]],
      },
    })
  getBidPrice('ltc_usd','wex', (askPrice) => {
    expect(askPrice).toEqual(56.140001)
    done()
  })
})

test('get usd x brl', () => {
  nock('http://free.currencyconverterapi.com')
    .get('/api/v3/convert?q=USD_BRL&compact=y')
    .reply(200, {
      'USD_BRL':{'val':3.271397},
    })
  return expect(usd_brl()).resolves.toEqual(3.271397)
})
