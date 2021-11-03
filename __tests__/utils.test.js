const { convertAllValuesToNumbers, extractingValuesFromArrayOfObjects, insertIntoStringRightBeforeWord } = require('../utils/utils')

describe('All utils tests:', () => {
    describe('convertAllValuesToNumbers', () => {
        it('return object with the same keys but values converted to numbers', () => {
            const object = {
                string: '23',
                string2: '12',
                string3: 13
            }
            const expectedObject = {
                string: 23,
                string2: 12,
                string3: 13
            }
            expect(convertAllValuesToNumbers(object)).toEqual(expectedObject)
        })
    })
    describe('extractingValuesFromArrayOfObjects', () => {
        it('return array of values extracted from an objects', () => {
            const array = [
                { slug: 'euro game' },
                { slug: 'social deduction' },
                { slug: 'dexterity' },
                { slug: "children's games" }
              ]
            const expectedArray = ['euro game', 'social deduction', 'dexterity', "children's games"]
            expect(extractingValuesFromArrayOfObjects(array)).toEqual(expectedArray)
        })
    })
    describe('insertIntoStringRightBeforeWord', () => {
        it('return array of values extracted from an objects', () => {
            const string = 
            `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY reviews.review_id`
            const stringToInsert = 'WHERE reviews.category = $1'
            const word = "GROUP"
            const expectedString = 
            `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE reviews.category = $1 GROUP BY reviews.review_id`
            expect(insertIntoStringRightBeforeWord(string, stringToInsert, word)).toEqual(expectedString)
        })
    })
})