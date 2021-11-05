const apiRouter = require('express').Router();

const { getEndpoints } = require('../controllers/global.controllers')
const { getCategories } = require('../controllers/categories.controllers')
const { getReviews, getReviewById, patchReviewById } = require('../controllers/reviews.controllers')
const { getCommentsByReviewId, postNewCommentToReviewId, deleteCommentById } = require('../controllers/comments.controllers')
const { getUsers } = require('../controllers/users.controllers')

apiRouter.route('/').get(getEndpoints)
apiRouter.route('/categories').get(getCategories)
apiRouter.route('/reviews').get(getReviews)
apiRouter.route('/reviews/:review_id').get(getReviewById).patch(patchReviewById)
apiRouter.route('/reviews/:review_id/comments').get(getCommentsByReviewId).post(postNewCommentToReviewId)
apiRouter.route('/comments/:comment_id').delete(deleteCommentById)
apiRouter.route('/users').get(getUsers)

module.exports = apiRouter;