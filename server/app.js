/*require('./config/config');

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

// Body Parser
const bodyParser = require('body-parser')
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

// CORS
app.use(cors());

// DB Connection
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, (err, res) => {
    if (err)
        throw err;
    else
        console.log("MongoDB database connection established successfully");
});

app.get('/', function(req, res) {
    res.json('Hola mundo')
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});


app.use(require('./controllers/index'));*/


require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();