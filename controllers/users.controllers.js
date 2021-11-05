const { fetchAllUsers, fetchUserByUsername } = require('../models/users.models')

exports.getUsers = (req, res, next) => {
    fetchAllUsers()
    .then((users) => {
        res.status(200).send({users})
    })
    .catch(next)
}

exports.getUserByUserName = (req, res, next) => {
    const { username } = req.params
    fetchUserByUsername(username)
    .then((user) => {
        res.status(200).send(({user}))
    })
    .catch(next)
}