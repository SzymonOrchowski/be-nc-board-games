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
            })
            
        })
    })
})
