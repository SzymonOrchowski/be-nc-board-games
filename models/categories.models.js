const db = require('../db')

exports.fetchAllCategories = () => {
    return db
    .query('SELECT * FROM categories')
    .then(({rows}) => {
        return rows
    })
}
