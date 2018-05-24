import eth from './img/cryptos/eth.svg'
import ltc from './img/cryptos/ltc.svg'
import xrp from './img/cryptos/xrp.svg'
import btc from './img/cryptos/btc.svg'
import bch from './img/cryptos/bch.svg'
import zec from './img/cryptos/zec.svg'

export const logos = {
  eth, ltc, xrp, btc, bch, zec,
}

export const names = {
  eth: 'Ethereum',
  ltc: 'Litecoin',
  xrp: 'Ripple',
  btc: 'Bitcoin',
  bch: 'BitcoinCash',
  zec: 'Zcash',
}

export const getCryptoLogo = (id) => logos[id]
