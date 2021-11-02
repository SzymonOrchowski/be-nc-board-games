const express = require("express");
const apiRouter = require("./routes/api-router")
const { handleCustomErrors, handle500Errors } = require('./controllers/errors.controllers')

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'path not found'});
})
app.use(handleCustomErrors)
app.use(handle500Errors)

module.exports = app;