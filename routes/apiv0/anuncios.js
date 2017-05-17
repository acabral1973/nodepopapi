"use strict"

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio')

/* GET /apiv1/anuncios */
router.get('/', function(req, res, next) {

    let nombre = req.query.nombre; //recojo parametro de consulta por nombre
    const tags = req.query.tags; //recojo parametro de consulta por tags
    const venta = req.query.venta; //recojo parametro de consulta por tipo
    const minPrecio = req.query.minprecio; //recojo parametro mínimo de consulta por precio
    const maxPrecio = req.query.maxprecio; //recojo parametro máximo de consulta por precio
    const lineas = parseInt(req.query.lineas); //recojo parametro de lineas para paginar consultas
    
    const filter = {}; //creo filtro vacío

    if (nombre) {
        filter.nombre = {};
        nombre = '^'+nombre;
        console.log('nombre',nombre);
        filter.nombre.$regex = nombre;
    }

    if (tags) {
        filter.tags = tags;
    }

    if (venta) {
        filter.venta = venta;
    }
    if (minPrecio || maxPrecio) {
        filter.precio = {}; 
        if (minPrecio) {
            filter.precio.$gte = minPrecio;
        }

        if (maxPrecio) {
            filter.precio.$lte = maxPrecio;
        }
    } 

    Anuncio.list(filter, lineas, (err, anuncios) => {
        if (err) {
            next(err);    
            return;
        }
        res.json({success: true, result: anuncios});  
    });
});

module.exports = router;