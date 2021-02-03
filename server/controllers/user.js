const express = require('express');

const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

app.get('/usuarios', function(req, res) {

    User.find({}).exec((err, users) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            users
        });

    });

});

app.post('/usuarios', function(req, res) {
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

app.put('/usuarios/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'username', 'role']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: userDB
        });

    });


});

app.delete('/usuarios/:id', function(req, res) {

    let id = req.params.id;

    User.findByIdAndRemove(id, (err, removedUser) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            user: removedUser
        });

    });

});

module.exports = app;