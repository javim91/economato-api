const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const Role = require('../models/role');

const { validateFields } = require('../middlewares/validate-fields');
const { isValidRole, usernameExists, existUserById } = require('../helpers/db-validators');

const { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers)

router.post('/', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('username').custom(usernameExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    //check('role', 'El rol no es un rol permitido').isIn(['ADMIN', 'ECONOMATO', 'COCINA', 'BARES', 'USER']),
    check('role').custom(isValidRole),
    validateFields
],createUser)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isValidRole),
    validateFields
], updateUser)

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUser)

module.exports = router;