const apiRouter = require('express').Router();
const { getCategories } = require('../controllers/categories.controllers')
const { getReviews, getReviewById, patchReviewById } = require('../controllers/reviews.controllers')
const { getCommentsByReviewId, postNewCommentToReviewId } = require('../controllers/comments.controllers')

apiRouter.route('/categories').get(getCategories)
apiRouter.route('/reviews').get(getReviews)
apiRouter.route('/reviews/:review_id').get(getReviewById).patch(patchReviewById)
apiRouter.route('/reviews/:review_id/comments').get(getCommentsByReviewId).post(postNewCommentToReviewId)

module.exports = apiRouter;