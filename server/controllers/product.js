const express = require('express');
const Product = require('../models/product');

let app = express();


// Show all products
app.get('/products', async(req, res) => {
    const products = await Product.find({});

    try {
        res.send(products);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Create new Product
app.post('/products', (req, res) => {
    let body = req.body;

    let product = new Product({
        code: body.code,
        name: body.name,
        price: body.price,
        unit: body.unit,
        multiply: body.multiply,
        provider: body.provider,
        center: body.center
    });

    product.save((err, productDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            product: productDB
        });

    });

});

// Update Product
app.put('/products/:id', (req, res) => {

});

// Delete Product
app.delete('/products/:id', (req, res) => {

});




module.exports = app;