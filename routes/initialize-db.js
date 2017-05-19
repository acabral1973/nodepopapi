"use strict"

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let Anuncio = require('../models/Anuncio')
let Usuario = require('../models/Usuario')
const sha256 = require('sha256');
const async = require('async');
const anuncios = require('../data/anuncios.json');
const usuarios = require('../data/usuarios.json');
require('../lib/translator');



// GET initialize-db
router.get('/', function(req, res, next) {

    const idioma = req.query.idioma;
    // vacía la colección de anuncios y carga anuncios de prueba
    Anuncio.remove((err) => {
        if (err) {
            console.log("initialize-db: Error vaciando la colección de anuncios");    
            res.json({success: false, result: translator('ADS_DB_ERROR',idioma) });  
            next(err);    
            return;
        }
        console.log("initialize-db: Coleccion de anuncios eliminada");

        // cargo anuncios de prueba
        console.log("initialize-db: Cargando anuncios de prueba");
        async.concat(anuncios.dataAnuncios, Anuncio.guardaAnuncio, (err, anunciosGuardados) => {
            if (err){
                console.log("initialize-db: Error inicializando colección de anuncios");    
                res.json({success: false, result: translator('ADS_DB_ERROR',idioma) });  
                next(err);
                return;
            }
        });
    });

    // vacía la colección de usuarios y carga usuarios de prueba
    Usuario.remove((err) => {
        if (err) {
            console.log("initialize-db: Error vaciando la colección de usuarios");    
            res.json({success: false, result: translator('USER_DB_ERROR',idioma) });  
            next(err);    
            return;
        }
        console.log("initialize-db: Coleccion de usuarios eliminada");

        // cargo usuarios de prueba
        console.log("initialize-db: Creando usuarios de prueba");
        async.concat(usuarios.dataUsuarios, Usuario.guardaUsuario, (err, usuariosGuardados) => {
            if (err){
                console.log("initialize-db: Error inicializando colección de usuarios");    
                res.json({success: false, result: translator('USER_DB_ERROR',idioma) });  
                next(err);
                return;
            }
        });
    });

    // configuro respuesta exitosa
    console.log('initialize-db: Inicialización de colecciones correcta');    
    res.json({success: true, result: translator('INIT_DB_OK',idioma)});  
});

module.exports = router;