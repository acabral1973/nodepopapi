"use strict"

const mongoose = require('mongoose');
let Anuncio = require('../models/Anuncio')
let Usuario = require('../models/Usuario')
const sha256 = require('sha256');
const async = require('async');
const anuncios = require('../data/anuncios.json');
const usuarios = require('../data/usuarios.json');
const translator  = require('../lib/translator');
require('./connect-mongoose');

// Defino función de inicialización de la base de datos
function initializeDb(callbackinInicial) {

    // vacía la colección de anuncios y carga anuncios de prueba
    Anuncio.remove((err) => {
        if (err) {
            console.log("initialize-db: Error vaciando la colección de anuncios");    
            callbackinInicial(err);
            return;
        }
        console.log("initialize-db: Coleccion de anuncios eliminada");

        // cargo anuncios de prueba
        console.log("initialize-db: Cargando anuncios de prueba");
        async.concat(anuncios.dataAnuncios, Anuncio.guardaAnuncio, (err, anunciosGuardados) => {
            if (err){
                console.log("initialize-db: Error inicializando colección de anuncios");    
                callbackinInicial(err);
                return;
            }
            console.log('initialize-db: todos los anuncios creados correctamente')
        });
    });

    // vacía la colección de usuarios y carga usuarios de prueba
    Usuario.remove((err) => {
        if (err) {
            console.log("initialize-db: Error vaciando la colección de usuarios");    
            callbackinInicial(err);
            return;
        }
        console.log("initialize-db: Coleccion de usuarios eliminada");

        // cargo usuarios de prueba
        console.log("initialize-db: Creando usuarios de prueba");
        async.concat(usuarios.dataUsuarios, Usuario.guardaUsuario, (err, usuariosGuardados) => {
            if (err){
                console.log("initialize-db: Error inicializando colección de usuarios");    
                callbackinInicial(err);
                return;
            }
            console.log('initialize-db: todos los usuarios creados correctamente')
            callbackinInicial(null);
            return;
        });
    });
};

// Inicializo la base de datos
initializeDb((err) => {
    if (err){
        console.log("initialize-db: Error inicializando colecciones");    
        return;
    } 
    // configuro respuesta exitosa
    console.log('initialize-db: Inicialización de colecciones correcta'); 
});