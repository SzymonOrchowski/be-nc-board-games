const apiRouter = require('express').Router();
const { getCategories } = require('../controllers/categories.controllers')
const { getReviews, getReviewById, patchReviewById } = require('../controllers/reviews.controllers')

apiRouter.route('/categories').get(getCategories)
apiRouter.route('/reviews').get(getReviews)
apiRouter.route('/reviews/:review_id').get(getReviewById).patch(patchReviewById)

module.exports = apiRouter;