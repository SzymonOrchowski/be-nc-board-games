function convertAllValuesToNumbers(obj) {
    const newObj = {};
    const objectKeys = Object.keys(obj)
    objectKeys.forEach(key => {
        newObj[key] = Number(obj[key])
    })
    return newObj
}

function extractValuesFromArrayOfObjects(array) {
    const newArray = []
    array.forEach(object => {newArray.push(Object.values(object))})
   return newArray.flat()
}

function insertIntoStringRightBeforeWord(string, stringToInsert, word) {
    let indexToSlice = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === word[0]) {
            let matched = false;
            for (let j = 0; j < word.length; j++) {
                if (string[i+j] === word[j]) matched = true;
            }
            if (matched === true) indexToSlice = i;
        }
    }
    return string.slice(0, indexToSlice-1) + ' ' + stringToInsert + ' ' + string.slice(indexToSlice)
}

function convertUnderscoreToSpace(string) {
    let newString = ''
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '_') {
            newString += ' '
        } else {
            newString += string[i]
        }
    }
    return newString;
}

module.exports = { 
    convertAllValuesToNumbers, 
    extractValuesFromArrayOfObjects, 
    insertIntoStringRightBeforeWord,
    convertUnderscoreToSpace 
}
