exports.getEndpointsInformationObject = () => {
    const endpointsInformationObject = require('../endpoints.json')
    return Promise.resolve(endpointsInformationObject)
}