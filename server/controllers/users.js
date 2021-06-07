//const express = require('express');

const { response, request } = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');
/*const app = express();

const _ = require('underscore');
const User = require('../models/user');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');*/

/*app.get('/', [verifyToken, verifyAdminRole], function(req, res) {

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

});*/

const getUsers = async(req = request, res = response) => {

    const { limit = 0, from = 0 } = req.query;

    const [ totalUsers, users ] = await Promise.all([
        User.countDocuments(),
        User.find()
        .skip(Number(from))
        .limit(Number(limit)),
    ])

    res.json({
        totalUsers,
        users
    });

}

const createUser = async(req = request, res = response) => {

    const { name, username, password, role } = req.body;
    const user = new User({ name, username, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save in DB
    await user.save((err, userDB) => {

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
}

const updateUser = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, username, ...userData } = req.body;

    // Validar contra base de datos
    if( password ) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        userData.password = bcryptjs.hashSync(password, salt);
    } 

    const user = await User.findByIdAndUpdate(id, userData);

    res.json({
        ok: true,
        user: user
    });

}

const deleteUser = async (req, res) => {

    const { id } =  req.params;

    const user = await User.findByIdAndDelete(id);

    res.json({
        ok: true,
        user
    });

}

/*app.post('/', verifyToken, function(req, res) {
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

app.put('/:id', verifyToken, function(req, res) {

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

app.delete('/:id', verifyToken, function(req, res) {

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

});*/

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};