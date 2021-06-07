const express = require('express');

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


app.post('/signup', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        username: body.username,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        userDB.password = null;

        res.json({
            ok: true,
            user: userDB
        })

    });


});



module.exports = app;