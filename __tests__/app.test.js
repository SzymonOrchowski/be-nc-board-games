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
    // describe('App.js tests: ', () => {
    //     test('status:404, responds with error message', () => {

    //     })
    // })
})
