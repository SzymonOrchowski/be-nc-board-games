const db = require('../')

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  return db
    .query('DROP TABLE IF EXISTS categories')
    .then(()=>{
      return db.query(`CREATE TABLE categories (
        slug VARCHAR NOT NULL UNIQUE PRIMARY KEY,
        description VARCHAR NOT NULL);`
      )
    })
  // 2. insert data
};

module.exports = { seed };
