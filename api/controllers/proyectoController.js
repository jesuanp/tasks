const Proyecto = require('../models/proyecto');
const {validationResult} = require('express-validator');


module.exports = {

    crearProyecto: async (req, res) => {

        // Validar si hay errores
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        try{

            let proyecto = await new Proyecto(req.body);
            proyecto.creador = req.usuario.id;
            proyecto.save();

            res.json(proyecto)

        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }
    },

    obtenerProyectos: async (req, res) => {
        try{

            const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({_id: 1})
            res.json(proyectos);
        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }
    },

    actualizarProyecto: async (req, res) => {

        // Validar si hay errores
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        const {nombre} = req.body;
        const nuevoProyecto = {};

        if(nombre){
            nuevoProyecto.nombre = nombre;
        }

        try{
            // revisar el Id
            let proyecto = await Proyecto.findById(req.params.id);

            // Si el proyecto existe o no
            if(!proyecto) return res.status(400).json({msg: 'Proyecto no escontrado'});

            // verificar el creador del proyecto
            if(proyecto.creador.toString() !== req.usuario.id){
                return res.satus(401).json({msg: 'No autorizado'})
            }

            // Actualizar el proyecto
            proyecto = await Proyecto.findOneAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: nuevoProyecto
                },
                {
                    new: true
                }
            )

            res.json({proyecto})
        }
        catch(err){
            console.log(err);
            res.status(401).json({msg: 'Hubo un error'})
        }
    },

    eliminarProyecto: async (req, res) => {

        try{
            // revisar el Id
            let proyecto;
            proyecto = await Proyecto.findById(req.params.id);

            // Si el proyecto existe o no
            if(!proyecto) return res.status(400).json({msg: 'Proyecto no escontrado'});

            // verificar el creador del proyecto
            if(proyecto.creador.toString() !== req.usuario.id){
                return res.satus(401).json({msg: 'No autorizado'})
            }

            // buscar y eliminar el proyecto
            proyecto = await Proyecto.findOneAndRemove({_id: req.params.id});

            res.json({msg: 'Proyecto eliminado correctamente'})
        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'})
        }
    }
}
