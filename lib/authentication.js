"use strict"
const basicAuth = require('basic-auth');

//cargar colección de usuarios para validación
const Usuario = require('../models/Usuario')

module.exports = (req, res, next) => {
    const user = basicAuth(req);
    console.log('Validando usuarios mediante Basic Authentication');

    if (!user) {
        res.set('WWW-Authenticate','Basic realm=Authorization Required');
        res.send(401);
        return;
    }

    //Busco el usuario en la base de datos y si existe valido la contraseña
    Usuario.busca(user.name, (err, datosUsuario) => {
        if (err) {
            next(err);    
            return;
        }

        // Verifico si el usuario fue encontrado y si la contraseña coincide
        // en caso contrario vuelvo a pedirlos y registro en la consola una 
        //  traza de seguridad con error de login para el usuario solicitado 
        if (!datosUsuario || datosUsuario.clave !== user.pass) {
            console.log('Usuario ', user.name, ' no existe o contraseña incorrecta');
            res.set('WWW-Authenticate','Basic realm=Authorization Required');
            res.send(401);
            return;
        }

        // si validación correcta  registro traza de seguridad en la consola        
        // indicando login correcto para el usuario solicitado 
        console.log('Acceso concedido a ',user.name);
        next();
    });
    
}