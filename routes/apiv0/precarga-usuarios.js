"use strict"

const Usuario = require('../../models/Usuario')
let usuarios = new Array();

usuarios.push(new Usuario({
    nombre: 'Alejandro Cabral',
    email: 'cabralejandro@gmail.com',
    clave: 'S3cr3t@'
}));

usuarios.push(new Usuario({
    nombre: 'Visitante',
    email: 'none',
    clave: '12345678'
}));

usuarios.push(new Usuario({
    nombre: 'Javier Miguel',
    email: 'jamg44@gmail.com',
    clave: '12345678'}));

module.exports = usuarios;