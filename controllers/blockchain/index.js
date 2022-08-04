const curated_theme_contracts = require('../curated_theme_contracts.json')
const themes = Object.keys(curated_theme_contracts)

const blockchainScore = (address) => {
  const query = cleanQueries(JSON.parse(process.env.QUERY))
  const queries = Object.keys(query)
  const janamKundali = await getJanamKundali(address);
  await Promise.all(
    queries.map(async (queryy) => {
      data[queryy] = await queryClients[queryy](
        janamKundali,
        query[queryy].query || undefined,
        address
      );
    })
  );
  const levels = {};
  Object.keys(data).forEach((query) => {
    levels[query] = findScore(query, data[query]);
  });
  let finalScore = 0;
  await Promise.all([
    queries.forEach(async (queryy) => {
      finalScore += levels[queryy] * (query[queryy].weight || 1);
    }),
  ]);
  return finalScore;
}

function cleanQueries(query) {
  let cleaned = {}
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === Object) {
      cleaned[key] = cleanQueries(query[key])
    } else if (typeof query[key] === Array) {
    } else {
      cleaned[key] = curated_theme_contracts[query[key]] || query[key]
    }
  })
  return cleaned
}
