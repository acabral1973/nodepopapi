"use strict"

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio')
const auth = require('../../lib/authentication');
var sha256 = require('sha256');

router.use(auth);

// GET /apiv1/anuncios 
router.get('/', function(req, res, next) {

    let nombre = req.query.nombre; //recojo parametro de consulta por nombre
    const tags = req.query.tags; //recojo parametro de consulta por tags
    const venta = req.query.venta; //recojo parametro de consulta por tipo
    const minPrecio = parseInt(req.query.minprecio); //recojo parametro mínimo de consulta por precio
    const maxPrecio = parseInt(req.query.maxprecio); //recojo parametro máximo de consulta por precio
    const lineas = parseInt(req.query.lineas); //recojo parametro de lineas para paginar consultas
    const orden = req.query.orden; //recojo parametro para ordenar
    const inicio = parseInt(req.query.inicio); //recojo desde donde debe empezar a mostrar anuncios
    const filtro = {}; //creo filtro vacío

    if (nombre) {
        filtro.nombre = {};
        nombre = '^'+nombre;
        filtro.nombre.$regex = nombre;
        filtro.nombre.$options = 'i';
    }

    if (tags) {
        filtro.tags = tags;
    }

    if (venta) {
        filtro.venta = venta;
    }

    if (minPrecio || maxPrecio) {
        filtro.precio = {}; 
        if (minPrecio) {
            filtro.precio.$gte = minPrecio;
        }

        if (maxPrecio) {
            filtro.precio.$lte = maxPrecio;
        }
    } 
    
    Anuncio.list(filtro, inicio, lineas, orden, (err, anuncios) => {
        if (err) {
            next(err);    
            return;
        }
        res.json({success: true, result: anuncios});  
    });
});

// GET /apiv1/anuncios/tags 
router.get('/tags', function(req, res, next) {
    res.json({success: true, result: ['work', 'lifestyle', 'motor', 'mobile']});  
});

module.exports = router;