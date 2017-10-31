import {
  getPrice,
  getAskPrice,
  getBidPrice,
  usd_brl,
} from './model'

test('shows get latest traded price', (done) => {
  getPrice('ltc_brl','braziliex', (lastPrice) => {
    expect(lastPrice).toEqual('186.79999999')
    done()
  })
})

test('get best ask price', (done) => {
  getAskPrice('ltc_brl','braziliex', (askPrice) => {
    expect(askPrice).toEqual(186.9)
    done()
  })
})

test('get best bid price', (done) => {
  getBidPrice('ltc_brl','braziliex', (askPrice) => {
    expect(askPrice).toEqual(184.9)
    done()
  })
})

test('shows get latest traded price at Wex', (done) => {
  getPrice('ltc_usd','wex', (lastPrice) => {
    expect(lastPrice).toEqual(56.835)
    done()
  })
})

test('get best ask price at Wex', (done) => {
  getAskPrice('ltc_usd','wex', (askPrice) => {
    expect(askPrice).toEqual(56.97)
    done()
  })
})

test('get best bid price at Wex', (done) => {
  getBidPrice('ltc_usd','wex', (askPrice) => {
    expect(askPrice).toEqual(56.7)
    done()
  })
})

test('get usd x brl', (done) => {
  usd_brl((value) => {
    expect(value).toEqual(3.282902)
    done()
  })
})
