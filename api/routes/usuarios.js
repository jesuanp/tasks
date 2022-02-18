const {Router} = require('express');
const {crearUsuario} = require('../controllers/usuarioController');
const {check} = require('express-validator');

const router = Router();

//crear usuarios
// api/usuarios
router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agreaga un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    crearUsuario
)

module.exports = router;
