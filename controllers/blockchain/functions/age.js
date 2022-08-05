async function age(txns) {
  const currentDate = new Date()
  const createdDate = new Date(txns.txns[txns.txns.length - 1].block_timestamp)
  const differenceInMilliseconds = currentDate.getTime() - createdDate.getTime()
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 3600 * 24)
  )
  return differenceInDays
}

export default age
