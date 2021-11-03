const request = require("supertest");
const db = require('../db');
const testData = require('../db/data/test-data/');
const { seed } = require('../db/seeds/seed');
const app = require('../app.js')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('All tests: ', () => {
    describe('Seed file tests', () => {
        test('Check if seed.sql file creates table categories, and has columns: slug, description', () => {
            return db.query('SELECT * FROM categories').then(data => {
                expect(data.fields[0].name).toBe('slug');
                expect(data.fields[1].name).toBe('description');
            }).catch(err => {
                expect(err).toBe(undefined);
            })
        })
        test('Check if seed.sql file creates table users, and it has columns: username, avatar_url, name', () => {
            return db.query('SELECT * FROM users').then(data => {
                expect(data.fields[0].name).toBe('username');
                expect(data.fields[1].name).toBe('avatar_url');
                expect(data.fields[2].name).toBe('name');
            }).catch(err => {
                expect(err).toBe(undefined);
            }) 
        })
        test('Check if seed.sql file creates table reviews, and it has columns: review_id, title, review_body, designer, review_img_url, votes, category, owner, created_at', () => {
            return db.query('SELECT * FROM reviews').then(data => {
                expect(data.fields[0].name).toBe('review_id');
                expect(data.fields[1].name).toBe('title');
                expect(data.fields[2].name).toBe('review_body');
                expect(data.fields[3].name).toBe('designer');
                expect(data.fields[4].name).toBe('review_img_url');
                expect(data.fields[5].name).toBe('votes');
                expect(data.fields[6].name).toBe('category');
                expect(data.fields[7].name).toBe('owner');
                expect(data.fields[8].name).toBe('created_at');
            }).catch(err => {
                expect(err).toBe(undefined);
            }) 
        })
        test('Check if seed.sql file creates table comments, and it has columns: comment_id, author, review_id, votes, created_at, body', () => {
            return db.query('SELECT * FROM comments').then(data => {
                expect(data.fields[0].name).toBe('comment_id');
                expect(data.fields[1].name).toBe('author');
                expect(data.fields[2].name).toBe('review_id');
                expect(data.fields[3].name).toBe('votes');
                expect(data.fields[4].name).toBe('created_at');
                expect(data.fields[5].name).toBe('body');
            }).catch(err => {
                expect(err).toBe(undefined);
            }) 
        })

        //insert data tests

        test('Check if data is inserted into categories table', ()=>{
            return db.query('SELECT * FROM categories')
            .then(({rows}) => {
                expect(rows.length).toBeGreaterThan(0);
                rows.forEach(category => {
                    expect(category).toHaveProperty('slug');
                    expect(category).toHaveProperty('description');
                })
            })
        })
        test('Check if data is inserted into users table', ()=>{
            return db.query('SELECT * FROM users')
            .then(({rows}) => {
                expect(rows.length).toBeGreaterThan(0);
                rows.forEach(category => {
                    expect(category).toHaveProperty('username');
                    expect(category).toHaveProperty('avatar_url');
                    expect(category).toHaveProperty('name');
                })
            })
        })
        test('Check if data is inserted into reviews table', ()=>{
            return db.query('SELECT * FROM reviews')
            .then(({rows}) => {
                expect(rows.length).toBeGreaterThan(0);
                rows.forEach(category => {
                    expect(category).toHaveProperty('review_id');
                    expect(category).toHaveProperty('title');
                    expect(category).toHaveProperty('review_body');
                    expect(category).toHaveProperty('designer');
                    expect(category).toHaveProperty('review_img_url');
                    expect(category).toHaveProperty('votes');
                    expect(category).toHaveProperty('category');
                    expect(category).toHaveProperty('owner');
                    expect(category).toHaveProperty('created_at');
                })
            })
        })
        test('Check if data is inserted into comments table', ()=>{
            return db.query('SELECT * FROM comments')
            .then(({rows}) => {
                expect(rows.length).toBeGreaterThan(0);
                rows.forEach(category => {
                    expect(category).toHaveProperty('comment_id');
                    expect(category).toHaveProperty('author');
                    expect(category).toHaveProperty('review_id');
                    expect(category).toHaveProperty('votes');
                    expect(category).toHaveProperty('created_at');
                    expect(category).toHaveProperty('body');
                })
            })
        })
    })

    // App.js endpoints tests

    describe('App.js tests: ', () => {
        test('status:404, responds with error message', () => {
            return request(app)
            .get('/api/wrong-path')
            .expect(404)
            .then(({body})=> {
                expect(body.msg).toBe("path not found")
            })
        })
        describe('GET /api/categories', () => {
            test('status:200, responds with an array of categories', () => {
                return request(app)
                .get('/api/categories')
                .expect(200)
                .then(({body}) => {
                    body.categories.forEach((category) => {
                        expect(category).toEqual(
                            expect.objectContaining({
                            slug : expect.any(String),
                            description : expect.any(String)
                        }))
                        
                    })   
                })
            })
        })
        describe('GET /api/reviews/:review_id', () => {
            test('status:200, responds with a review object', () => {
                return request(app)
                .get('/api/reviews/2')
                .expect(200)
                .then(({body}) => {
                    expect(body.review).toMatchObject(
                        {
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            review_body: expect.any(String),
                            designer: expect.any(String),
                            review_img_url: expect.any(String),
                            votes: expect.any(Number),
                            category: expect.any(String),
                            owner: expect.any(String),
                            created_at: expect.any(String),
                            comment_count: expect.any(Number)
                        }
                    )
                })
            })
            test('status:404, responds with an error message if review_id is in proper type but doesn\'t exist in database', () => {
                return request(app)
                .get('/api/reviews/9999')
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).toBe('Review of that id doesn\'t exist.')
                })
            })
            test('status:404, responds with an error message if review_id is wrong type', () => {
                return request(app)
                .get('/api/reviews/WrongPathType')
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).toBe('path not found')
                })
            })
        })
        describe('PATCH /api/reviews/:review_id', () => {
            test('status:200, responds with a object of updated review', () => {
                return request(app)
                .patch('/api/reviews/2')
                .send({ inc_votes: 22 })
                .expect(200)
                .then(({body}) => {
                    expect(body.review).toMatchObject(
                        {
                            review_id: expect.any(Number),
                            title: expect.any(String),
                            review_body: expect.any(String),
                            designer: expect.any(String),
                            review_img_url: expect.any(String),
                            votes: expect.any(Number),
                            category: expect.any(String),
                            owner: expect.any(String),
                            created_at: expect.any(String),
                        }
                    )
                    expect(body.review.votes).toBeGreaterThanOrEqual(22);
                })
            })
            test('status:200, check if decrementing votes stops at 0', () => {
                return request(app)
                .patch('/api/reviews/2')
                .send({ inc_votes: -222 })
                .expect(200)
                .then(({body}) => {
                    expect(body.review.votes).toBe(0);
                })
            })
            test('status:400, responds with message "Incorrect type of data", when passed wrong type of data (key is not a inc_votes)', () => {
                return request(app)
                .patch('/api/reviews/2')
                .send({ votes: 22 })
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Incorrect type of data')
                })
            })
            test('status:400, responds with message "Incorrect type of data", when passed wrong type of data (value is not a number)', () => {
                return request(app)
                .patch('/api/reviews/2')
                .send({ inc_votes: 'car' })
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Incorrect type of data')
                })
            })
            test('status:400, responds with message "Incorrect type of data", when passed wrong type of data (object has more then one key)', () => {
                return request(app)
                .patch('/api/reviews/2')
                .send({ inc_votes: 44, votes: 22 })
                .expect(400)
                .then(({body}) => {
                    expect(body.msg).toBe('Incorrect type of data')
                })
            })
            test('status:404, responds with an error message if review_id is in proper type but doesn\'t exist in database', () => {
                return request(app)
                .patch('/api/reviews/9999')
                .send({ inc_votes: 22 })
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).toBe('Review of that id doesn\'t exist.')
                })
            })
            test('status:404, responds with an error message if review_id is wrong type', () => {
                return request(app)
                .patch('/api/reviews/WrongPathType')
                .send({ inc_votes: 22 })
                .expect(404)
                .then(({body}) => {
                    expect(body.msg).toBe('path not found')
                })
            })
        })
        describe.only('GET /api/reviews', () => {
            test('status:200, responds with an array of object reviews', () => {
                return request(app)
                .get('/api/reviews')
                .expect(200)
                .then(({body}) => {
                    body.reviews.forEach(review => {
                        expect.objectContaining(
                        {
                            owner: expect.any(String),
                            title: expect.any(String),
                            review_id: expect.any(Number),
                            category: expect.any(String),
                            review_img_url: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number)
                        })
                    })
                })
            })
        })
    })
})
