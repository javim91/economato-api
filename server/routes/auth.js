const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const { login } = require('../controllers/auth');


const router = Router();

router.post('/login', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login)

module.exports = router;