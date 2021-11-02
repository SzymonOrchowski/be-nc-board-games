const apiRouter = require('express').Router();
const { getCategories } = require('../controllers/categories.controllers')
const { getReviewById } = require('../controllers/reviews.controllers')

apiRouter.route('/categories').get(getCategories)
apiRouter.route('/reviews/:review_id').get(getReviewById)

module.exports = apiRouter;