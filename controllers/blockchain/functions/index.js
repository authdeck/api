import numberOfTransactions from "./numberOfTransactions.js";
import numberOfErc20Transactions from "./numberOfErc20Transactions.js";
import numberOfNftTransactions from "./numberOfNftTransactions.js";
import castVote from "./castVote.js";

import defi from "./defi.js";
import actions from "./actions.js";
import getNFTs from "./NFTs.js";
import arweave from "./arweave.js";
import getEns from "./ens.js";
import nativeBalance from "./nativeBalance.js";
const { compound } = require("../curated_theme_contracts.json");
import age from "./age.js";

const queries = {
  numberOfTransactions: async (txns, data) =>
    await numberOfTransactions(txns, data),
  numberOfErc20Transactions: async (txns, data) =>
    await numberOfErc20Transactions(txns, data),
  numberOfNftTransactions: async (txns) => await numberOfNftTransactions(txns),
  numberOfTransactionsTo: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfTransactionsFrom: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "from"),
  numberOfPolygonBridges: async (txns) =>
    await numberOfTransactions(
      txns,
      [
        "0xA0c68C638235ee32657e8f720a23ceC1bFc77C77",
        "0x401f6c983ea34274ec46f84d70b31c151321188b",
      ],
      "from"
    ),
  numberOfSpecificErc20Transactions: async (txns, data) =>
    await numberOfErc20Transactions(txns, data.address),
  numberOfSpecificNftTransactions: async (txns, data) =>
    await numberOfNftTransactions(txns, data.address),
  everHeldERC20: async (txns, data) => {
    if ((await numberOfErc20Transactions(txns, data.address)) > 0) {
      return 1;
    }
    return 0;
  },
  everHeldNft: async (txns, data) => {
    console.log(data);
    if ((await numberOfNftTransactions(txns, data.address)) > 0) {
      return 1;
    }
    return 0;
  },

  numberOfMints: async (txns) => await actions(txns, "mint"),
  numberOfWithdraws: async (txns) => await actions(txns, "withdraw"),
  numberOfBurns: async (txns) => await actions(txns, "burn"),
  numberOfContractInteractions: async (txns, data) =>
    await numberOfTransactions(txns, data.address),
  numberOfContractInteractionsSent: async (txns, data) =>
    await numberOfTransactions(txns, data.address, "to"),
  numberOfBorrows: async (txns) => await defi(txns, "borrow"),
  numberOfRepayments: async (txns) => await defi(txns, "repay"),
  numberOfStakingTransactions: async (txns) => await defi(txns, "stake"),
  numberOfApprovals: async (txns) => await defi(txns, "approve"),
  numberOfClaims: async (txns) => await defi(txns, "claim"),
  numberOfOpenseaTransactions: async (txns) => await actions(txns, "opensea"),
  numberOfProposalsCreated: async (txns) =>
    await defi(txns, "proposal_created"),
  everCastedVote: async (txns) => castVote(txns, false),
  numberOfVotesCasted: async (txns) => castVote(txns, true),
  numberOfNFTsHeld: async (txns, data, address) => {
    const x = (await getNFTs(address)).number_of_NFTs;
    console.log(x);
    return x;
  },

  nativeBalance: async (txns, data, address) => {
    const x = await nativeBalance(address);
    return x;
  },

  numberOfBluechipsHeld: async (txns, data, address) =>
    (await getNFTs(address)).number_of_bluechip,
  // isNFTPFP: async () => await
  numberOfDeposits: async (txns) => await defi(txns, "deposit"),
  getArweaveBalance: async (txns, data) => await arweave(data, true),
  getArweaveTxnSize: async (txns, data) => await arweave(data, false),
  haveEns: async (txns, data, address) => {
    const x = await getEns(address);
    console.log(x);
    return x;
  },
  compoundUsage: async (txns) => await numberOfTransactions(txns, compound),
  walletAge: async (txns) => await age(txns),
};

export default queries;
