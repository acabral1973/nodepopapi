"use strict"

// Módulo de traducción de errores inglés - español
const diccionario = require('../data/diccionario.json');

function translator(clave, idioma) {
    for (let i = 0; i < diccionario.dataDiccionario.length; i++){
        if (diccionario.dataDiccionario[i].clave===clave){
            if (idioma='eng') {
                return diccionario.dataDiccionario[i].eng;
            }
            return diccionario.dataDiccionario[i].esp;
        }
    }
}

module.exports = translator;