const apiRouter = require('express').Router();

const { getEndpoints } = require('../controllers/global.controllers')
const { getAllCategories } = require('../controllers/categories.controllers')
const { getReviews, getReviewById, patchReviewById } = require('../controllers/reviews.controllers')
const { getCommentsByReviewId, postNewCommentToReviewId, deleteCommentById, patchCommentById } = require('../controllers/comments.controllers')
const { getUsers, getUserByUserName } = require('../controllers/users.controllers')

apiRouter.route('/').get(getEndpoints)
apiRouter.route('/categories').get(getAllCategories)
apiRouter.route('/reviews').get(getReviews)
apiRouter.route('/reviews/:review_id').get(getReviewById).patch(patchReviewById)
apiRouter.route('/reviews/:review_id/comments').get(getCommentsByReviewId).post(postNewCommentToReviewId)
apiRouter.route('/comments/:comment_id').patch(patchCommentById).delete(deleteCommentById)
apiRouter.route('/users').get(getUsers)
apiRouter.route('/users/:username').get(getUserByUserName)

module.exports = apiRouter;