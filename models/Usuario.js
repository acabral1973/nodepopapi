"use strict"

const mongoose = require('mongoose');

// defino delesquema de usuarios
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// creo un método estático para listar usuarios
usuarioSchema.statics.list = function(filtro, limite, saltar, campos, ordenar, callback){
    const query = Usuario.find(filtro);
    query.limit(limite);
    query.skip(saltar);
    query.select(campos);
    query.sort(ordenar);
    query.exec(callback);
};

// creo un método de instancia para buscar usuarios
// si el usuario existe lo devuelve, si no, devuelve null
usuarioSchema.statics.busca = function(usuario, callback) {
    let query = Usuario.findOne({ email: usuario });
    return query.exec(callback);
};

// creo el modelo y lo exporto
var  Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;