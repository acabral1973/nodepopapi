"use strict"
var sha256 = require('sha256');

const mongoose = require('mongoose');

// defino delesquema de usuarios
var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

usuarioSchema.index({email: 1}, {unique: true});

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

// creo un método estático para guardar un usuario
usuarioSchema.statics.guardaUsuario = function(usuario, callback){
    
    const nuevoUsuario = new Usuario(usuario);
    nuevoUsuario.clave = sha256(nuevoUsuario.clave);  // hasheo la clave
    nuevoUsuario.save((err, usuarioCreado) => {
        if (err) {
            callback(err);    
        }
        callback(null, usuarioCreado);
    });
};


// creo el modelo y lo exporto
var  Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;