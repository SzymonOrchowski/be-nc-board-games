const devData = require('../data/dev-data/index.js');
const seed = require('./seed.js');
const db = require('../');

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
