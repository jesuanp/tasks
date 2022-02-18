const {Router} = require('express');
const {check} = require('express-validator');
const {autenticarUsuario, usuarioAutenticado} = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = Router();

//crear usuarios
// api/auth
router.post('/',
    autenticarUsuario
)

router.get('/',
    auth,
    usuarioAutenticado
)

module.exports = router;