const db = require('../db')

exports.fetchCommentsByReviewId = (review_id) => {
    console.log(review_id)
    return db
    .query(`
    SELECT * FROM comments WHERE $1
    `, [review_id])
    .then(({rows}) => {
        return rows
    })
}