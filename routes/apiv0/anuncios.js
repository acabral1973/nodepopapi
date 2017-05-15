"use strict"

var express = require('express');
var router = express.Router();
const Anuncio = require('../../models/Anuncio')

/* GET /apiv1/anuncios */
router.get('/', function(req, res, next) {

    Anuncio.list((err, anuncios) => {
        if (err) {
            next(err);    //devuelvo el error del método list
            return;
        }
        res.json({success: true, result: anuncios});  //devuelvo elresultado del método list
    });
});

module.exports = router;