import {
  getPrice,
} from './model'

test('shows get latest traded price', () => {
  getPrice('ltc_brl','braziliex', (lastPrice) => {
    expect(lastPrice).toEqual('184.00000000')
  })

})
