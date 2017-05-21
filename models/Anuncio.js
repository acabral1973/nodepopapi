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

// creo un método estático para listar anuncios
anuncioSchema.statics.list = function(filtro, inicio, lineas, orden, callback){
    const query = Anuncio.find(filtro);
    query.limit(lineas);
    query.skip(inicio);
    query.sort(orden);
    query.exec(callback);
};


// creo un método estático para guardar un anuncio
anuncioSchema.statics.guardaAnuncio = function(anuncio, callback){
    
    const nuevoAnuncio = new Anuncio(anuncio);
    nuevoAnuncio.save((err, anuncioCreado) => {
        if (err) {
            callback(err);    
            return;
        }
        console.log('Anuncio ' + anuncioCreado.nombre + ' creado');
        callback(null, anuncioCreado);
        return;
    });
};

// creo el modelo y lo exporto
var  Anuncio = mongoose.model('Anuncio', anuncioSchema);
module.exports = Anuncio;


