"use strict"

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario')
const auth = require('../../lib/authentication');
var sha256 = require('sha256');
require('../../lib/translator');

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
    // Creo un objeto de tipo Usuario con los parámetros que me llegan en el body
    
    const idioma = req.body.idioma;
    const usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.clave = req.body.clave;
    
    // Busco el usuario en la base de datos, si existe devuelvo json indicándolo 
    // y si no, lo creo y devuelvo json con los datos guardados
    Usuario.busca(usuario.email, (err, datosUsuario) => {
        if (err) {
            next(err);    
            return;
        }

        // Si el usuario no existe lo guardo en base de datos
        if (!datosUsuario) {
            Usuario.guardaUsuario(usuario, (err, usuarioGuardado) => {
                if (err) {
                    next(err);    
                    return;
                }
                res.json({sucess: true, result: usuarioGuardado + translator('IS_SAVED', idioma) });
                return;
            });
            return;
        }
        res.json({sucess: false, result: usuario.email + translator('IS_USER', idioma) });
        return;
    });
});

module.exports = router;