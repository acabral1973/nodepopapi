"use strict"

var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
let Anuncio = require('../../models/Anuncio')
const anuncios = require('./precarga-anuncios')
let Usuario = require('../../models/Usuario')
const usuarios = require('./precarga-usuarios')
var sha256 = require('sha256');

/* GET /apiv1/anuncios */
router.get('/', function(req, res, next) {

    // Defino función que elimina todos los elementos de una colección
    function vaciarDatos(elemento) {
        return new Promise((resolve, reject) => {
            elemento.remove((err) => {
                if (err) {
                    reject(err);    
                }
                resolve()
            });
        });
    }
    
    // Defino función que guarda un elemento en una colección
    function guardarElemento(elemento) {
        return new Promise((resolve, reject) => {
            elemento.save((err, elementoCreado) => {
                if (err) {
                    reject(err);    
                }
                console.log('Elemento ' + elementoCreado.nombre + ' creado');
                resolve()
            });
        });
    }

    // Defino función asíncrona que inicializa la colección
    async function initializeDB() {
        
        // vacía la colección de anuncios
        await vaciarDatos(Anuncio);

        // vacía la colección de usuarios
        await vaciarDatos(Usuario);

        // cargo anuncios de prueba
        console.log("cargando anuncios de PRUEBA");
        for (let i=0; i < anuncios.length ; i++) {
            console.log("Cargando anuncio ", anuncios[i].nombre);
            //Invoco función que guarda cada anuncio en la base de datos
            await guardarElemento(anuncios[i]);
        };

        // cargo anuncios de prueba
        console.log("cargando usuarios de PRUEBA");
        for (let i=0; i < usuarios.length ; i++) {
            // encripto la clave de usuario
            usuarios[i].clave = sha256(usuarios[i].clave);
            console.log("Cargando usuario ", usuarios[i].nombre);
            // Invoco función que guarda cada usuario en la base de datos
            await guardarElemento(usuarios[i]);
        };
    }

    initializeDB().then(() => {
        res.json({success: true, result: 'Colecciones de USUARIOS y ANUNCIOS inicializadas'});
    })
    .catch(err => {
        console.log('Hubo un error ',err);
    })
});

module.exports = router;