const {Factura} = require('../../db');
const createFactura = async (tipo_factura, ClientId, OrderId)=>{
    const factura = await Factura.create({tipo_factura, ClientId, OrderId});
    return factura;
}

module.exports = createFactura;