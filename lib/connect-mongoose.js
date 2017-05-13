"use strict"

const mongoose = require('mongoose');
const connection = mongoose.connection;

// Cargamos libreria de promesas
mongoose.Promise = global.Promise;

connection.on('error', err => {
    console.log('Ha habido un error al iniciar la conexión a la base de datos',err);
    process.exit(1);
});

connection.on('open', () => {
    console.log('Conectado a la base de datos nodepop usando Mongoose...');
});

mongoose.connect('mongodb://localhost:27017/nodepop');
