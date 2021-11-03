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
    if (Object.keys(body).length !== 1 || Object.keys(body)[0] !== 'inc_votes' || typeof body.inc_votes !== 'number') {
   
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
        if (currentVotesState.votes < 0) currentVotesState.votes = 0;
        return db
        .query('UPDATE reviews SET votes = $2 WHERE review_id = $1 RETURNING *', [review_id, currentVotesState.votes])
        .then(({rows}) => {
            return rows[0]
        })
    })
}

exports.fetchReviews = (sort_by) => {
    let queryStr = `
    SELECT
    reviews.owner,
    reviews.title,
    reviews.review_id,
    reviews.category,
    reviews.review_img_url,
    reviews.created_at,
    reviews.votes,
    COUNT(comments.review_id) AS comment_count 
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    `
    const queryValues = []
    if (sort_by !== undefined) {
        if (['owner', 'title', 'review_id', 'category', 'review_img_url', 'created_at', 'votes'].includes(sort_by)) {
            sortingQuery = 'reviews.' + sort_by
        } else if (['comment_count'].includes(sort_by)) {
            sortingQuery = sort_by
        } else {
            sortingQuery = 'reviews.created_at'
        }
        queryStr += ` ORDER BY ${sortingQuery} DESC`
    }
    
    return db
    .query(queryStr, queryValues)
    .then(({rows}) => {
        return rows
    })
}
