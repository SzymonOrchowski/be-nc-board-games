const db = require('../db')
const { convertAllValuesToNumbers } = require('../utils/utils')

exports.fetchReviewById = (review_id) => {
    return db
    .query(`SELECT review_id FROM reviews`)
    .then(({rows}) => {
        if (Number(review_id) !== NaN) {
            if (Number(review_id) > rows.length) {
                return Promise.reject({status: 404, msg: 'Review of that id doesn\'t exist.'})
            }
            return db
            .query(`SELECT COUNT(comment_id) AS comment_count FROM comments WHERE review_id = $1`, [review_id])
            .then(({rows}) => {
                let commentCountObjWithValuesAsNumbers = convertAllValuesToNumbers(rows[0]);
                return db
                .query(`
                SELECT review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at
                FROM reviews 
                LEFT JOIN users ON reviews.owner = users.username 
                WHERE review_id = $1
                `, [review_id])
                .then(({rows}) => {
                return {...rows[0], ...commentCountObjWithValuesAsNumbers}
                })
            })
        }
        
    })
    
}

