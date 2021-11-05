const db = require('../db')

exports.fetchAllUsers = () => {
    return db
    .query('SELECT username FROM users')
    .then(({rows}) => {
        return rows
    })
}