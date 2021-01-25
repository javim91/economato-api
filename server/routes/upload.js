const express = require('express');
const fileUpload = require('express-fileupload');
const readXlsxFile = require('read-excel-file/node');
const Provider = require('../models/provider');
const Product = require('../models/product');
const app = express();

// default options
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload', function(req, res) {

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        });
    }

    let xlsFile = req.files.xlsFile;

    const map = {
        'ID. PRODUCTO': 'code',
        'DESCRIPCIÓN': 'name',
        'PRECIO': 'price',
        'UNIDAD DE MEDIDA': 'unit',
        'EQUIVALENCIA UMB/UMP': 'multiply',
        'NOMBRE DE PROVEEDOR': 'provider',
    }



    readXlsxFile(xlsFile.tempFilePath, { map }).then(async(rows) => {


        let productsXLS = rows.rows;
        let providersXLS = [];
        let providersIDsXLS = [];
        let auxProviders = [];

        // Get providers
        for (let i = 0; i < productsXLS.length; i++) {
            productsXLS[i].center = '3504'; // asignar centro del usuario en sesion
            if (!auxProviders.includes(productsXLS[i]['provider'])) {

                auxProviders.push(productsXLS[i]['provider']);

                // buscar en la bbdd proveedor
                let provider = await Provider.findOne({ name: productsXLS[i]['provider'] });

                if (!provider) {
                    console.log('Entra');
                    provider = new Provider({
                        name: productsXLS[i]['provider'],
                        center: '3504',
                    });
                    provider.save();
                }


                providersXLS.push(provider);
                providersIDsXLS.push(provider._id);
            }
        }

        // Update products with provider information (id)
        for (let i = 0; i < productsXLS.length; i++) {

            const result = providersXLS.find(array => array.name === productsXLS[i]['provider']);
            productsXLS[i]['provider'] = result._id;

        }

        // Traer de la base de datos los articulos de los proveedores que hay en providersXLS
        let hideFields = {
            _id: false,
            __v: false,
        };
        let productsDB = await Product.find({ provider: { $in: providersIDsXLS } }, hideFields);

        // Comparar dichos articulos con los articulos del fichero y eliminar de la base de datos aquellos articulos que no esten en el fichero
        // Y si existe en el fichero, borrar esa entrada del fichero
        // ej: Si existen aceitunas de fran y chemi en la bbdd pero en el fichero estando fran y chemi, estos no tienen esas aceitunas, borrarlas.
        for (const pdb of productsDB) {
            let existProduct = false;

            for (let i = 0; i < productsXLS.length; i++) {
                if (JSON.stringify(pdb) === JSON.stringify(productsXLS[i])) {
                    existProduct = true;
                    productsXLS.splice(i, 1);
                }
            }

            if (!existProduct) {
                await Product.findOneAndRemove({ code: pdb.code, provider: pdb.provider, center: pdb.center });
            }
        };

        // Dar de alta los productos :)
        for (const pdxls of productsXLS) {
            let product = new Product(pdxls);
            product.save();
        }

        res.json(productsXLS);
    })


});

module.exports = app;