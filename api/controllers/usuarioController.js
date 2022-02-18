const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = {

    crearUsuario: async (req, res) => {

        // Validar si hay errores
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }

        const {email, password} = req.body;

        try{


            let usuario;

            usuario = await Usuario.findOne({email});

            if(usuario){
                res.status(404).json({msg: 'Usuario ya registrado'});
                return;
            };

            datosUsuario = req.body;

            const salt = await bcryptjs.genSalt(10);
            datosUsuario.password = await bcryptjs.hash(password, salt);

            usuario = await Usuario.create(datosUsuario);

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
            res.status(404).send('Hubo un error');
        }
    }
}
