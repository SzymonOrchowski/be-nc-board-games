const db = require('../')

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  return db
    .query('DROP TABLE IF EXISTS comments;')
    .then(()=>{
      return db.query('DROP TABLE IF EXISTS reviews;')
    })
    .then(()=>{
      return db.query('DROP TABLE IF EXISTS categories;')
    })
    .then(()=>{
      return db.query('DROP TABLE IF EXISTS users;')
    })
    .then(()=>{
      return db.query(`CREATE TABLE categories (
        slug VARCHAR NOT NULL UNIQUE PRIMARY KEY,
        description VARCHAR NOT NULL);`
      )
    })
    .then(()=>{
      return db.query(`CREATE TABLE users (
        username VARCHAR NOT NULL UNIQUE PRIMARY KEY,
        avatar_url VARCHAR NOT NULL,
        name VARCHAR NOT NULL
      );`)
    })
    .then(()=>{
      return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR NOT NULL,
        review_img_url VARCHAR DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR REFERENCES categories(slug),
        owner VARCHAR REFERENCES users(username),
        created_at TIMESTAMP
      );`)
    })
    .then(()=>{
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR REFERENCES users(username),
        review_id INT REFERENCES reviews(review_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP,
        body TEXT NOT NULL
      );`)
    })
  // 2. insert data
};

module.exports = { seed };
