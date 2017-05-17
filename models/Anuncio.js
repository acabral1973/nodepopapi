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
anuncioSchema.statics.list = function(filtro, limite, callback){
    console.log('filtro', filtro);
    console.log('limite', limite);

    const query = Anuncio.find(filtro);
    query.limit(limite);
    query.sort('nombre');
    query.exec(callback);
};

// creo el modelo y lo exporto
var  Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;


