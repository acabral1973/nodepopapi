"use strict"

var express = require('express');
var router = express.Router();
const Usuario = require('../../models/Usuario')

/* GET /apiv1/agentes */
router.get('/', function(req, res, next) {

    Usuario.list((err, usuarios) => {
        if (err) {
            next(err);    //devuelvo el error del método list
            return;
        }
        res.json({success: true, result: usuarios});  //devuelvo elresultado del método list
    });
});

module.exports = router;