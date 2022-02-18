const express = require('express');
const {crearTarea, obtenerTareas, actualizarTarea, eliminarTarea} = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');

const router = express.Router();

// crear tarea
// api/tareas
router.post('/', 
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty()
    ],
    crearTarea
);

router.get('/', 
    auth,
    obtenerTareas
);

router.put('/:id', 
    auth,
    actualizarTarea
);

router.delete('/:id', 
    auth,
    eliminarTarea
);

module.exports = router;
