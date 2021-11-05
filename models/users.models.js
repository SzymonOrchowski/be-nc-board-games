const db = require('../db')
const { extractingValuesFromArrayOfObjects } = require('../utils/utils')

exports.fetchAllUsers = () => {
    return db
    .query('SELECT username FROM users')
    .then(({rows}) => {
        return extractingValuesFromArrayOfObjects(rows)
    })
}