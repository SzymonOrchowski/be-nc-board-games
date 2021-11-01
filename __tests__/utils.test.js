const { convertAllValuesToNumbers } = require('../utils/utils')

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
})