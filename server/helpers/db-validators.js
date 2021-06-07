const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') => {
    const roleExists = await Role.findOne({ role });
    if(!roleExists) {
        throw new Error(`El rol ${ role } no está permitido`);
    }
}

const usernameExists = async(username = '') => {
    const usernameExists = await User.findOne({ username });
    if(usernameExists){
        throw new Error(`El nombre de usuario ya está registrado`);
    }
}

const existUserById =  async( id ) => {
    const userExist = await User.findById(id);
    if(!userExist) {
        throw new Error(`El id #${id} no existe`);
    }
}

module.exports = {
    isValidRole,
    usernameExists,
    existUserById
}