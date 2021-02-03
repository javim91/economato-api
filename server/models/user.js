const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN', 'ECONOMATO', 'COCINA', 'BARES', 'USER'],
    message: '{VALUE} no es un rol válido'
};

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
        default: 'USER',
        enum: validRoles
    },

});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('User', userSchema);