import { ethers } from 'ethers'
import { ETHAuth, Proof, ETHAuthVersion } from '@0xsequence/ethauth'

const wallet = ethers.Wallet.createRandom()
const claims = {
  app: 'authdeck',
  iat: Math.round(new Date().getTime() / 1000),
  exp: Math.round(new Date().getTime() / 1000) + 60 * 60 * 24 * 300,
  v: ETHAuthVersion,
}

console.log('claims', claims)

async function main() {
  // create token object
  const proof = new Proof({ address: wallet.address })
  proof.claims = claims

  const digest = proof.messageDigest()
  const digestHex = ethers.utils.hexlify(digest)

  console.log('proof', proof)
  console.log('digest', digest)
  console.log('digestHex', digestHex)
  proof.signature = await wallet.signMessage(digest)
  const ethAuth = new ETHAuth()
  const proofString = await ethAuth.encodeProof(proof)
  console.log('proofstring', proofString)
}

main()
