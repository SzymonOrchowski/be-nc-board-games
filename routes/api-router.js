const apiRouter = require('express').Router();
const { getCategories } = require('../controllers/categories.controllers')
const { getReviewById } = require('../controllers/reviews.controllers')

apiRouter.get('/categories', getCategories)
apiRouter.get('/reviews/:review_id', getReviewById)

module.exports = apiRouter;