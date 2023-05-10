const deleteFactura = require('../../controllers/factura/deleteFactura');

const deleteFacturaHandler = async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedFactura = await deleteFactura(id);
        res.status(200).send(deletedFactura);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}
module.exports = deleteFacturaHandler;