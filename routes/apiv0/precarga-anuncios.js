"use strict"

const Anuncio = require('../../models/Anuncio')
let anuncios = new Array();

anuncios.push(new Anuncio({
    nombre: 'Ford Ka 2008',
    venta: true,
    precio: 1800,
    foto: 'ford-ka.png',
    tags: ['motor']
}));

anuncios.push(new Anuncio({
    nombre: 'Bicicleta',
    venta: true,
    precio: 230.15,
    foto: 'bici.jpg',
    tags: ['lifestyle', 'motor']
}));

anuncios.push(new Anuncio({
    nombre: 'Lumia 660',
    venta: true,
    precio: 78,
    foto: 'lumia-660.png',
    tags: ['mobile']
}));

anuncios.push(new Anuncio({
    nombre: 'Caja herramientas',
    venta: true,
    precio: 55,
    foto: 'caja-herramientas.png',
    tags: ['work', 'lifestyle']
}));

anuncios.push(new Anuncio({
    nombre: 'Furgoneta con caja',
    venta: false,
    precio: 2200,
    tags: ['motor']
}));

anuncios.push(new Anuncio({
    nombre: 'Bicicleta de montaña',
    venta: false,
    precio: 330,
    tags: ['lifestyle']
}));

anuncios.push(new Anuncio({
    nombre: 'iPhone 3GS',
    venta: false,
    precio: 50.00,
    tags: ['lifestyle', 'mobile']
}));

anuncios.push(new Anuncio({
    nombre: 'Cortadora de césped',
    venta: false,
    precio: 100,
    tags: ['work', 'lifestyle']
}));

anuncios.push(new Anuncio({
    nombre: 'Taladro con percutor',
    venta: true,
    precio: 50,
    tags: ['work', 'lifestyle']
}));

module.exports = anuncios;