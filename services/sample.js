const Knex = require('../db');

async function getSamples(query) {
  let limit = query.limit || 10,
      page = query.page || 1;

  const tuts = await Knex('sample')
    .limit(limit)
    .offset(limit * (page - 1));
  return tuts;
}

module.exports = {
  getSamples,
};
