exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '08P01') {
        res.status(500).send({msg: 'PSQL Error - 08P01 - protocol_violation'})
    } else {
        next(err)
    }
}

exports.handle500Errors = (err, req, res, next) => {

    res.status(500).send({msg: 'Internal server error'})
}