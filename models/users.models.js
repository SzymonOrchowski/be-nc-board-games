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
        if (rows[0] === undefined) {
            return Promise.reject({status:404, msg:'No such username in database'})
        }
        return rows[0]
    })
}