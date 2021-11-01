const db = require('../db')

exports.fetchAllCategories = () => {
    return db
    .query('SELECT * FROM categories')
    .then(({rows}) => {
        console.log(rows);
        return rows
    })
}