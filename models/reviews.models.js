const db = require('../db')

exports.fetchReviewById = (review_id) => {
    let query = `SELECT COUNT(comment_id) AS comment_count FROM comments WHERE review_id = $1`
    return db
    .query(query, [review_id])
    .then(({rows}) => {
        const commentCountObj = rows[0]
        return db
        .query(`
        SELECT review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at
        FROM reviews 
        LEFT JOIN users ON reviews.owner = users.username 
        WHERE review_id = $1
        `, [review_id])
        .then(({rows}) => {
        //    console.log(commentCountObj)
        //    console.log(rows[0])
           return {...rows[0], ...commentCountObj}
        })
    })
}

