const express = require('express')

const app = express()

app.use(require('./user'));
app.use(require('./provider'));
app.use(require('./product'));
app.use(require('./upload'));


module.exports = app;