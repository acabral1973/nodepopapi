"use strict"

const mongoose = require('mongoose');

// defino delesquema de usuarios
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// creo el modelo y lo exporto
var  Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;