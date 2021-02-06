const express = require('express');

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


app.post('/login', function(req, res) {

    let body = req.body;

    User.findOne({ username: body.username }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario o la contraseña son incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario o la contraseña son incorrectos'
                }
            });
        }

        let token = jwt.sign({
            user: userDB,
        }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION }); // 30 dias

        res.json({
            ok: true,
            user: userDB,
            token
        });

    });


});



module.exports = app;