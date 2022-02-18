const Tarea = require('../models/tarea');
const Proyecto = require('../models/proyecto');
const {validationResult} = require('express-validator');

module.exports = {
    crearTarea: async (req, res) => {

        // Validar si hay errores
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        const {proyecto} = req.body;

        try{

            const proyectoActual = await Proyecto.findById(proyecto);

            if(!proyectoActual){
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            // verificar el creador del proyecto
            if(proyectoActual.creador.toString() !== req.usuario.id){
                return res.satus(401).json({msg: 'No autorizado'})
            }

            // creamos la tarea
            const tarea = new Tarea(req.body);
            tarea.save();

            res.json(tarea)

        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }

    },

    obtenerTareas: async (req, res) => {

        const {proyecto} = req.query;

        try{

            const proyectoActual = await Proyecto.findById(proyecto);

            if(!proyectoActual){
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            // verificar el creador del proyecto
            if(proyectoActual.creador.toString() !== req.usuario.id){
                return res.satus(401).json({msg: 'No autorizado'})
            }

            const tareas = await Tarea.find({proyecto});

            res.json(tareas)
        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }
    },

    actualizarTarea: async (req, res) => {

        const {proyecto, nombre, estado} = req.body;

        try{

            const tarea = await Tarea.findById(req.params.id);

            if(!tarea) return res.status(404).json({msg: 'La tarea no existe'});

            // extraer proyecto
            const proyectoActual = await Proyecto.findById(proyecto);

            // verificar el creador del proyecto
            if(proyectoActual.creador.toString() !== req.usuario.id){
                return res.satus(401).json({msg: 'No autorizado'})
            }

            const nuevaTarea = {};

            if(nombre) nuevaTarea.nombre = nombre;
            if(estado) nuevaTarea.estado = estado;

            const tareaActializada = await Tarea.findByIdAndUpdate({_id: req.params.id}, nuevaTarea, {new: true});

            res.json({tareaActializada})

        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }
    },

    eliminarTarea: async (req, res) => {

        const {proyecto} = req.query;

        try{

            const tarea = await Tarea.findById(req.params.id);

            if(!tarea) return res.status(404).json({msg: 'La tarea no existe'});

            // extraer proyecto
            const proyectoActual = await Proyecto.findById(proyecto);

            // verificar el creador del proyecto
            if(proyectoActual.creador.toString() !== req.usuario.id){
                return res.satus(401).json({msg: 'No autorizado'})
            }

            const tareaEliminar = await Tarea.findOneAndRemove({_id: req.params.id});

            res.json({msg: 'Tarea eliminada'});

        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }
    },
}