import { ethers } from "ethers";

async function nativeBalance(address) {
  const balance = await ethers.getDefaultProvider().getBalance(address);
  console.log(parseInt(balance.toString()));
  return parseInt(balance.toString());
}

export default nativeBalance;
