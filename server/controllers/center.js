const express = require('express');

let app = express();

let Center = require('../models/center');

app.get('/centros', (req, res) => {

    Center.find({})
        .sort('name')
        .exec((err, centers) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                centers
            });

        })
});


app.get('/centros/:id', (req, res) => {
    // Center.findById(....);

    let id = req.params.id;

    Center.findById(id, (err, centerDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!centerDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }


        res.json({
            ok: true,
            center: centerDB
        });

    });


});


app.post('/centros', (req, res) => {
    // regresa la nueva center
    // req.usuario._id
    let body = req.body;

    let center = new Center({
        code: body.code,
        name: body.name
    });


    center.save((err, centerDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!centerDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            center: centerDB
        });


    });


});

app.put('/centros/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let centerData = {
        code: body.code,
        name: body.name
    };

    Center.findByIdAndUpdate(id, centerData, { new: true, runValidators: true }, (err, centerDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!centerDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            center: centerDB
        });

    });


});

// ============================
// Mostrar todas las centers
// ============================
app.delete('/centros/:id', (req, res) => {
    // solo un administrador puede borrar centers
    // Center.findByIdAndRemove
    let id = req.params.id;

    Center.findByIdAndRemove(id, (err, centerDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!centerDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Centro borrado'
        });

    });


});


module.exports = app;