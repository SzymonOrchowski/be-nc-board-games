const { fetchCommentsByReviewId, addNewCommentToReviewId, removeCommentById } = require('../models/comments.models')

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

exports.deleteCommentById = (req, res, next) => {
    const {comment_id} = req.params
    removeCommentById(comment_id)
    .then((response) => {
        res.sendStatus(response.status)
    })
    .catch(next)
}