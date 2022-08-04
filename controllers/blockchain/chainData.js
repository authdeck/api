// ever held an NFT
// ever held an ERC20 token
// number of transactions
// categories
// ever sent a particular NFT
// ever minted a particular NFT
// ever sent a particular ERC20 token
// ever minted a particular ERC20 token
import fetch from 'node-fetch'

async function fetchTx(ethereumAddress) {
  let finalResults = []
  let result = await fetch(
    `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth`,
    {
      headers: {
        // eslint-disable-next-line no-undef
        "X-API-Key": process.env.MORALIS,
      },
    }
  ).then((res) => res.json());
  finalResults.push(...result.result)
  let cursor = result.cursor
  while (
    result.total > finalResults.length
    // result.page_size * (result.page - 1) + result.result.length
  ) {
    result = await fetch(
      `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth&cursor=${cursor}`,
      {
        headers: {
          // eslint-disable-next-line no-undef
          'X-API-Key': process.env.MORALIS,
        },
      }
    ).then((res) => res.json())
    finalResults.push(...result.result)

    cursor = result.cursor
  }
  return finalResults
}

async function fetchErc20Tx(ethereumAddress) {
  let finalResults = []
  let result = await fetch(
    `https://deep-index.moralis.io/api/v2/${ethereumAddress}/erc20/transfers?chain=eth`,
    {
      headers: {
        // eslint-disable-next-line no-undef
        'X-API-Key': process.env.MORALIS,
      },
    }
  ).then((res) => res.json())
  try {
    finalResults.push(...result.result)
  } catch (e) {
    console.log(e)
  }

  let cursor = result.cursor
  while (
    result.total > finalResults.length
    // result.page_size * (result.page - 1) + result.result.length
  ) {
    result = await fetch(
      `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth&cursor=${cursor}`,
      {
        headers: {
          // eslint-disable-next-line no-undef
          'X-API-Key': process.env.MORALIS,
        },
      }
    ).then((res) => res.json())
    try {
      finalResults.push(...result.result)
    } catch (e) {
      console.log(e)
    }
    cursor = result.cursor
  }
  return finalResults
}

async function fetchNftTx(ethereumAddress) {
  let finalResults = []
  let result = await fetch(
    `https://deep-index.moralis.io/api/v2/${ethereumAddress}/nft/transfers?chain=eth`,
    {
      headers: {
        // eslint-disable-next-line no-undef
        'X-API-Key': process.env.MORALIS,
      },
    }
  ).then((res) => res.json())
  finalResults.push(...result.result)
  let cursor = result.cursor
  while (
    result.total > finalResults.length
    // result.page_size * (result.page - 1) + result.result.length
  ) {
    result = await fetch(
      `https://deep-index.moralis.io/api/v2/${ethereumAddress}?chain=eth&cursor=${cursor}`,
      {
        headers: {
          // eslint-disable-next-line no-undef
          'X-API-Key': process.env.MORALIS,
        },
      }
    ).then((res) => res.json())
    try {
      finalResults.push(...result.result)
    } catch (e) {
      console.log(e)
    }
    cursor = result.cursor
  }
  return finalResults
}

async function getJanamKundali(address) {
  const NFTs = await fetchNftTx(address)
  const ERC20s = await fetchErc20Tx(address)
  const txns = await fetchTx(address)
  const janamKundali = {
    NFTs,
    ERC20s,
    txns,
  }
  return janamKundali
}

export default getJanamKundali
