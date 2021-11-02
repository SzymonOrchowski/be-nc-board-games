const { fetchReviewById, updateVotesByReviewId } = require('../models/reviews.models')

exports.getReviewById = (req, res, next) => {
    const {review_id} = req.params
    fetchReviewById(review_id)
    .then((review) => {
        res.status(200).send({review})
    })
    .catch(next)
}

exports.patchReviewById = (req, res, next) => {
    const {review_id} = req.params
    const {body} = req
    updateVotesByReviewId(review_id, body)
    .then((review) => {
        res.status(200).send({review})
    })
    .catch(next)
}