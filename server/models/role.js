var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var roleSchema = new Schema({
    code: { type: String, required: [true, 'El código del rol es obligatorio'] },
    name: { type: String, required: [true, 'El nombre del rol es obligatorio'] },
});


module.exports = mongoose.model('Role', roleSchema);