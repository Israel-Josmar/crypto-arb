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
