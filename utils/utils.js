function convertAllValuesToNumbers(obj) {
    const newObj = {};
    const objectKeys = Object.keys(obj)
    objectKeys.forEach(key => {
        newObj[key] = Number(obj[key])
    })
    return newObj
}

module.exports = { convertAllValuesToNumbers }