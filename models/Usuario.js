"use strict"

const mongoose = require('mongoose');

// defino delesquema de usuarios
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

//creamos un método estático para listar usuarios
usuarioSchema.statics.list = function(callback){
    const query = Usuario.find();
    query.exec(callback);
};
// creo el modelo y lo exporto
var  Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;