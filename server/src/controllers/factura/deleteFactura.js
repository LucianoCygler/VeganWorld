const {Factura} = require('../../db');

deleteFactura = async (id)=>{
    const factura = await Factura.findOne({ where: { id } });
    if (!factura){
        throw new Error(`No se encontró una factura con el id ${id}`);
    }
    await factura.destroy();
    return `La factura con el id ${id} fue elimanada correctamente`;
}

module.exports = deleteFactura;