const { Schema, model } = require('mongoose');


var roleSchema = new Schema({
    role: { 
        type: String, 
        required: [true, 'El rol es obligatorio'] 
    },
});


module.exports = model('Role', roleSchema);