const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

    const { username, password } = req.body;

    try {

        // Verify if username exists
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({
                msg: '-Nombre de usuario o contraseña incorrectos'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Nombre de usuario o -contraseña incorrectos'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Ha ocurrido un error'
        });
    }

}

module.exports = {
    login
}