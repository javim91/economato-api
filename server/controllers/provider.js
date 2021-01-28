const express = require('express');
const Provider = require('../models/provider');

let app = express();


// Show all providers
app.get('/providers', async(req, res) => {
    const providers = await Provider.find({});

    try {
        res.send(providers);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Create new provider
app.post('/providers', (req, res) => {
    let body = req.body;

    let provider = new Provider({
        name: body.name,
        center: body.center,
    });

    provider.save((err, providerDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!providerDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            provider: providerDB
        });

    });

});

// Update provider
app.put('/providers/:id', (req, res) => {

});

// Delete provider
app.delete('/providers/:id', (req, res) => {

});




module.exports = app;