const {getEndpointsInformationObject} = require('../models/global.models')

exports.getEndpoints = (req, res, next) => {
    getEndpointsInformationObject()
    .then((endpoints) => {
        res.status(200).send(endpoints)
    })
}