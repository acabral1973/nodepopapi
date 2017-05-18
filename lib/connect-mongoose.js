"use strict"
const host = 'localhost';     // nombre del servidor mongoDB
const puerto = '27017';       // puerto del servidor mongoDB
const db = 'nodepop';         // nombre de la base de datos
const cadenaConexion = 'mongodb://'+host+':'+puerto+'/'+db;
let noIndex = {};

// esta línea agrega a la cadena de conexión un parámetro que deshabilita
// el autoindexado de la base de datos, con el objetivo de optimizar el 
// rendimiento en entornos de producción 
// si se desea activar el autoindexado basta con comentar la siguiente línea
noIndex = { config: { autoIndex: false } };

const mongoose = require('mongoose');
const connection = mongoose.connection;

// Cargamos libreria de promesas
mongoose.Promise = global.Promise;

connection.on('error', err => {
    console.log('Ha habido un error de conexión con la base de datos',err);
    process.exit(1);
});

connection.on('open', () => {
    console.log('Conectado a mongoDB...');
});

console.log('Conectando a ',cadenaConexion);
mongoose.connect(cadenaConexion, noIndex);
