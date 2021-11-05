const db = require('../db')

exports.fetchAllUsers = () => {
    return db
    .query('SELECT username FROM users')
    .then(({rows}) => {
        return rows
    })
}

exports.fetchUserByUsername = (username) => {
    return db
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then(({rows}) => {
        return rows[0]
    })
}