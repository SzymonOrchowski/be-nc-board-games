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
                expect(data.fields[1].name).toBe('description')
            }).catch(err => {
                expect(err).toBe(undefined)
            })
        })
        test('Check if seed.sql file creates table users, and it has columns: username, avatar_url, name', () => {
            return db.query('SELECT * FROM users').then(data => {
                expect(data.fields[0].name).toBe('username');
                expect(data.fields[1].name).toBe('avatar_url')
                expect(data.fields[2].name).toBe('name')
            }).catch(err => {
                expect(err).toBe(undefined)
            }) 
        })
    })
})
