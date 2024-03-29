import { createRequire } from 'module' // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url) // construct the require method
const scores = require('./scores.json')

function findScore(query, number) {
  const xyz = scores[query]
  const minimum = xyz[0]
  let score = 0
  const multiplier = xyz[1]
  if (number > minimum && query !== 'nativeBalance') {
    let cursor = 0
    let currentBase = minimum
    if (number < minimum) {
      return 0
    }
    score = 1
    cursor = 1
    while (cursor < number) {
      const requiredBase = multiplier * currentBase
      if (cursor + requiredBase > number) {
        score += (number - cursor) / requiredBase
      } else {
        score += 1
      }
      cursor += requiredBase
    }
  }
  console.log(`score for ${query} is ${score}`)
  return score
}

export default findScore
