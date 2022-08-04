async function numberOfNftTransactions(txns, query) {
  let address;
  if (query) {
    address = query.address || query;
    console.log(address)
    let num_txns = 0;
    if (typeof address === "string") {
      return txns.NFTs.filter(
        (txn) => txn.token_address.toLowerCase() === address.toLowerCase()
      ).length;
    } else {
      address.map((a) => {
        num_txns += txns.NFTs.filter(
          (txn) => txn.token_address.toLowerCase() === a.toLowerCase()
        ).length;
      });
      return num_txns;
    }
  }
  return txns.NFTs.length;
}

export default numberOfNftTransactions;
