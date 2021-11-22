const { fetchAllCategories } = require('../models/categories.models')

exports.getAllCategories = (req, res, next) => {
    fetchAllCategories()
    .then((categories) => {
        res.status(200).send({categories})
    })
    .catch(next)
}