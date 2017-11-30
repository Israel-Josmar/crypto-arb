// use node-fetch on test enviroment (instead of isomorphic-fetch)
// it works better with nock library
import fetch from 'node-fetch'
global.fetch = fetch
