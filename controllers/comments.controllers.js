const { fetchCommentsByReviewId, addNewCommentToReviewId } = require('../models/comments.models')

exports.getCommentsByReviewId = (req, res, next) => {
    const {review_id} = req.params
    fetchCommentsByReviewId(review_id)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

exports.postNewCommentToReviewId = (req, res, next) => {
    const {review_id} = req.params
    const {body} = req
    addNewCommentToReviewId(review_id, body)
    .then((comment) => {
        res.status(201).send({comment})
    })
    .catch(next)
}