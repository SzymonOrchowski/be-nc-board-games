const db = require('../db')
const { convertAllValuesToNumbers } = require('../utils/utils')

exports.fetchReviewById = (review_id) => {
    if (isNaN(Number(review_id))) {
        return Promise.reject({status: 404, msg: 'path not found'})
    }
    return db
    .query(`SELECT review_id FROM reviews`)
    .then(({rows}) => {
        if (Number(review_id) > rows.length) {
            return Promise.reject({status: 404, msg: 'Review of that id doesn\'t exist.'})
        }
    })
    .then(() => {
        return db
        .query(`SELECT COUNT(comment_id) AS comment_count FROM comments WHERE review_id = $1`, [review_id])
        .then(({rows}) => {
            let comment_count = convertAllValuesToNumbers(rows[0]);
            return comment_count
        })
        .then((comment_count) => {
            return db
            .query(`
            SELECT review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at
            FROM reviews 
            LEFT JOIN users ON reviews.owner = users.username 
            WHERE review_id = $1
            `, [review_id])
            .then(({rows}) => {
                return {...rows[0], ...comment_count}
            })
        })
    })   
}

exports.updateVotesByReviewId = (review_id, body) => {
    if (isNaN(Number(review_id))) {
        return Promise.reject({status: 404, msg: 'path not found'})
    }
    if (Object.keys(body).length !== 1 || Object.keys(body)[0] !== 'inc_votes') {
   
        return Promise.reject({status: 400, msg: 'Incorrect type of data'})
    }
    return db
    .query(`SELECT review_id FROM reviews`)
    .then(({rows}) => {
        if (Number(review_id) > rows.length) {
            return Promise.reject({status: 404, msg: 'Review of that id doesn\'t exist.'})
        }
    })
    .then(() => {
        return db
        .query('SELECT votes FROM reviews WHERE review_id = $1', [review_id])
        .then(({rows}) => {
            return rows[0]
        })
    })
    .then((currentVotesState) => {
        currentVotesState.votes += body.inc_votes
        return db
        .query('UPDATE reviews SET votes = $2 WHERE review_id = $1 RETURNING *', [review_id, currentVotesState.votes])
        .then(({rows}) => {
            return rows[0]
        })
    })
}

