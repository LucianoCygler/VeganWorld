const {Factura } = require ('../../db');

async function getAllFacturas(){
    const allFacturas = await Factura.findAll();
    return allFacturas;
}

module.exports = getAllFacturas;