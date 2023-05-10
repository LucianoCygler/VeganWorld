const {Factura} = require('../../db');

const getOneFactura = async (id)=>{
    const factura = await Factura.findByPk(id);
    if (!factura) throw new Error(`El id ${id} no se encontro en la base de datos`);
    return factura;
}

module.exports = getOneFactura;