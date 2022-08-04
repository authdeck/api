import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const curated_theme_contracts = require("./curated_theme_contracts.json");
import getJanamKundali from "./chainData.js";
import findScore from "./findScore.js";
import queryClients from "./functions/index.js";

const blockchainScore = async (address) => {
  const query = cleanQueries(JSON.parse(process.env.QUERY));
  const queries = Object.keys(query);

  const data = {};
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
};

function cleanQueries(query) {
  let cleaned = {};
  Object.keys(query).forEach((key) => {
    if (typeof query[key] === Object) {
      cleaned[key] = cleanQueries(query[key]);
    } else if (typeof query[key] === Array) {
      console.log("");
    } else {
      cleaned[key] = curated_theme_contracts[query[key]] || query[key];
    }
  });
  return cleaned;
}

export default blockchainScore;
