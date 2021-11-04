const devData = require('../data/dev-data/index.js');
const {seed} = require('./seed.js');
const db = require('../');

console.log(process.env.NODE_ENV)

const runSeed = () => {
  // console.log(devData)
  return seed(devData).then(() => db.end());
};

runSeed();
