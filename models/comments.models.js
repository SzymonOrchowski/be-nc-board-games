const db = require('../db')

exports.fetchCommentsByReviewId = (review_id) => {
    if (isNaN(Number(review_id))) {
        return Promise.reject({status: 400, msg: 'Review_id is not a number'})
    }
    return db
    .query(`
    SELECT comment_id, votes, created_at, author, body
    FROM comments 
    WHERE review_id = $1
    `, [review_id])
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({status: 200, msg: 'No comments for that review_id'})
        }
        return rows
    })
}

exports.addNewCommentToReviewId = (review_id, body) => {
    if (isNaN(Number(review_id))) {
        return Promise.reject({status: 400, msg: 'Review_id is not a number'})
    }
    
    return db
    .query(`
    INSERT INTO users (username) VALUES ($1)`, [body.username])
    .then(() => {
        const timeStamp = new Date()     
        return db.query(`INSERT INTO comments (author, review_id, body, created_at)
        VALUES ($1, $2, $3, $4) RETURNING *`, [body.username, review_id, body.body, timeStamp])
        .then(({rows}) => {
            return rows[0]
        })
    })
    
}