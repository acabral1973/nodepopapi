"use strict"

const mongoose = require('mongoose');

// defino el esquema de anuncios
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

//creamos un método estático para listar anuncios
anuncioSchema.statics.list = function(callback){
    const query = Anuncio.find();
    query.exec(callback);
};

// creo el modelo y lo exporto
var  Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;


