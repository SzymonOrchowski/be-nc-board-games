const express = require("express");
const apiRouter = require("./routes/api-router")

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
    res.status(404).send({msg: 'path not found'});
})
app.use((err, req, res, next) => {
      res.status(err.status).send({msg: err.msg})
})

module.exports = app;