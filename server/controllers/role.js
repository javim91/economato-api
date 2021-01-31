const express = require('express');

let app = express();

let Role = require('../models/role');

app.get('/roles', (req, res) => {

    Role.find({})
        .sort('name')
        .exec((err, roles) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                roles
            });

        })
});


app.get('/roles/:id', (req, res) => {
    // Role.findById(....);

    let id = req.params.id;

    Role.findById(id, (err, roleDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!roleDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            role: roleDB
        });

    });


});


app.post('/roles', (req, res) => {
    // regresa la nueva role
    // req.usuario._id
    let body = req.body;

    let role = new Role({
        code: body.code,
        name: body.name
    });


    role.save((err, roleDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!roleDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            role: roleDB
        });


    });


});

app.put('/roles/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let roleData = {
        code: body.code,
        name: body.name
    };

    Role.findByIdAndUpdate(id, roleData, { new: true, runValidators: true }, (err, roleDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!roleDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            role: roleDB
        });

    });


});

// ============================
// Mostrar todas las roles
// ============================
app.delete('/roles/:id', (req, res) => {
    // solo un administrador puede borrar roles
    // Role.findByIdAndRemove
    let id = req.params.id;

    Role.findByIdAndRemove(id, (err, roleDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!roleDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Rol borrado'
        });

    });


});


module.exports = app;