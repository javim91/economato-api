var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var centerSchema = new Schema({
    code: { type: Number, required: [true, 'El código del centro es obligatorio'] },
    name: { type: String, required: [true, 'El nombre del centro es obligatorio'] },
});


module.exports = mongoose.model('Center', centerSchema);