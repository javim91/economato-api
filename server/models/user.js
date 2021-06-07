const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
    values: ['ADMIN', 'ECONOMATO', 'COCINA', 'BARES', 'USER'],
    message: '{VALUE} no es un rol válido'
};

const userSchema = new Schema({
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
    const { __v, password, ...user } = this.toObject();
    return user;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = model('User', userSchema);