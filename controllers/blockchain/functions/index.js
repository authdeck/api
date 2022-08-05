import numberOfTransactions from './numberOfTransactions.js'
import numberOfErc20Transactions from './numberOfErc20Transactions.js'
import numberOfNftTransactions from './numberOfNftTransactions.js'
import castVote from './castVote.js'

import defi from './defi.js'
import actions from './actions.js'
import getNFTs from './NFTs.js'
import getEns from './ens.js'
import nativeBalance from './nativeBalance.js'

import { createRequire } from 'module' // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url) // construct the require method
const { compound } = require('../curated_theme_contracts.json')
import age from './age.js'

const queries = {
  numberOfTransactions: async (txns, data) =>
    await numberOfTransactions(txns, data),

  numberOfErc20Transactions: async (txns, data) =>
    await numberOfErc20Transactions(txns, data),

  numberOfNftTransactions: async (txns) => await numberOfNftTransactions(txns),

  numberOfMints: async (txns) => await actions(txns, 'mint'),

  numberOfWithdraws: async (txns) => await actions(txns, 'withdraw'),

  numberOfBurns: async (txns) => await actions(txns, 'burn'),

  numberOfBorrows: async (txns) => await defi(txns, 'borrow'),

  numberOfRepayments: async (txns) => await defi(txns, 'repay'),

  numberOfStakingTransactions: async (txns) => await defi(txns, 'stake'),

  numberOfApprovals: async (txns) => await defi(txns, 'approve'),

  numberOfClaims: async (txns) => await defi(txns, 'claim'),

  numberOfOpenseaTransactions: async (txns) => await actions(txns, 'opensea'),

  haveEns: async (txns, data, address) => {
    const x = await getEns(address)
    console.log(x)
    return x
  },

  numberOfProposalsCreated: async (txns) =>
    await defi(txns, 'proposal_created'),

  everCastedVote: async (txns) => castVote(txns, false),

  numberOfVotesCasted: async (txns) => castVote(txns, true),

  numberOfNFTsHeld: async (txns, data, address) => {
    const x = (await getNFTs(address)).number_of_NFTs
    console.log(x)
    return x
  },

  nativeBalance: async (txns, data, address) => {
    const x = await nativeBalance(address)
    return x
  },

  numberOfBluechipsHeld: async (txns, data, address) =>
    (await getNFTs(address)).number_of_bluechip,

  numberOfDeposits: async (txns) => await defi(txns, 'deposit'),

  compoundUsage: async (txns) => await numberOfTransactions(txns, compound),
  walletAge: async (txns) => await age(txns),
}

export default queries
