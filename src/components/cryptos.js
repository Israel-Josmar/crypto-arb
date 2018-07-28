import eth from '../assets/img/cryptos/eth.svg'
import ltc from '../assets/img/cryptos/ltc.svg'
import xrp from '../assets/img/cryptos/xrp.svg'
import btc from '../assets/img/cryptos/btc.svg'
import bch from '../assets/img/cryptos/bch.svg'
import zec from '../assets/img/cryptos/zec.svg'

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
