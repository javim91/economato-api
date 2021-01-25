const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let providerSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre del proveedor es obligatorio'],
        dropDups: true
    },
    center: {
        type: String,
        required: [true, 'El centro es obligatorio'],
    }
});

module.exports = mongoose.model('Provider', providerSchema);