import {
  getPrice,
  getAskPrice,
  getBidPrice,
} from './model'

test('shows get latest traded price', () => {
  getPrice('ltc_brl','braziliex', (lastPrice) => {
    expect(lastPrice).toEqual('184.00000000')
  })

})

test('get best ask price', () => {
  getAskPrice('ltc_brl','braziliex', (askPrice) => {
    expect(askPrice).toEqual(186.9)
  })

})

test('get best bid price', () => {
  getBidPrice('ltc_brl','braziliex', (askPrice) => {
    expect(askPrice).toEqual(184)
  })

})

test('shows get latest traded price at Wex', () => {
  getPrice('ltc_usd','wex', (lastPrice) => {
    expect(lastPrice).toEqual(56.835)
  })

})

test('get best ask price at Wex', () => {
  getAskPrice('ltc_usd','wex', (askPrice) => {
    expect(askPrice).toEqual(56.97)
  })

})

test('get best bid price at Wex', () => {
  getBidPrice('ltc_usd','wex', (askPrice) => {
    expect(askPrice).toEqual(56.7)
  })

})
