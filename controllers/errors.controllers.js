exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.handle500Errors = (err, req, res, next) => {
    res.status(500).send({msg: 'Internal server error'})
}