const express = require('express');
const {crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto} = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

const router = express.Router();

router.post('/',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    crearProyecto
);

router.get('/',
    auth,
    obtenerProyectos
);

router.put('/:id',
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    actualizarProyecto
);

router.delete('/:id',
    auth,
    eliminarProyecto
);

module.exports = router;
