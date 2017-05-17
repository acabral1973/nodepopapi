"use strict"

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario')
const auth = require('../../lib/authentication');

router.use(auth);

// GET /apiv1/usuarios ------> Listado de usuarios
router.get('/', function(req, res, next) {

    Usuario.list((err, usuarios) => {
        if (err) {
            next(err);    //devuelvo el error del método list
            return;
        }
        res.json({success: true, result: usuarios});  //devuelvo elresultado del método list
    });
});

//POST /apiv1/usuarios ------> Registro de usuarios
router.post('/', (req, res, next) => {
    console.log(req.body);

    // Ceo un objeto de tipo Usuario con los parámetros que me llegan en el body
    const usuario = new Usuario(req.body);

    // Busco el usuario en la base de datos, si existe devuelvo json indicándolo 
    // y si no, lo creo y devuelvo json con los datos guardados
    Usuario.busca(usuario.email, (err, datosUsuario) => {
        if (err) {
            next(err);    
            return;
        }

        // Si el usuario no existe lo guardo en base de datos
        if (!datosUsuario) {
            usuario.save((err, usuarioGuardado) => {
                if (err) {
                    next(err);    
                    return;
                }
                res.json({sucess: true, result: usuarioGuardado});
                return;
            });
            return;
        }
        res.json({sucess: false, result: 'El usuario '+ usuario.email +
                                         ' ya existe' });
        return;
    });
});

module.exports = router;