const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');


module.exports = {

    autenticarUsuario: async (req, res) => {
        // Validar si hay errores
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        const {email, password} = req.body;

        try{
            let usuario = await Usuario.findOne({email});
            if(!usuario){
                return res.status(400).json({msg: 'El usuario no existe'})
            }

            const passCorrecto = await bcryptjs.compare(password, usuario.password);
            if(!passCorrecto){
                return res.status(400).json({msg: 'El password es incorrecto'})
            }

            // Crear y firmar el jwt
            const payload = {
                usuario: {
                    id: usuario.id
                }
            };

            // firmar el jwt
            jwt.sign(payload, process.env.SECRETA, {
                expiresIn: 3600
            }, (err, token) => {
                if(err) throw err;

                res.json({token});
            })
        }
        catch(err){
            console.log(err);
        }
    },

    usuarioAutenticado: async (req, res) => {
        
        try{

            const usuario = await Usuario.findById(req.usuario.id).select('-password');
            res.json({usuario});

        }
        catch(err){
            console.log(err);
            res.status(500).json({msg: 'Hubo un error'});
        }
    }
}
