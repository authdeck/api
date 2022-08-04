async function stakedTokens(txns, query) {
  const token_addresses = query.address || query;
  console.log(token_addresses);
  let stakedTokens = {};
  txns.ERC20s.forEach((item) => {
    console.log(item.address);
    if (token_addresses.indexOf(item.address) > -1) {
      if (stakedTokens[item.address] != undefined) {
        stakedTokens[item.address] = stakedTokens[item.address] + 1;
      } else {
        stakedTokens[item.address] = 1;
      }
    } else {
      console.log("not found");
    }
  });
  const x = Object.keys(stakedTokens).length;
  console.log(x);
  return x;
}

export default stakedTokens;
