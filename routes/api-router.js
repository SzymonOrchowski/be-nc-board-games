const apiRouter = require('express').Router();
const { getCategories } = require('../controllers/categories.controllers')

apiRouter.get('/categories', getCategories)

module.exports = apiRouter;