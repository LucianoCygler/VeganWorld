const createFactura = require('../../controllers/factura/createFactura');

const createFacturaHandler = async (req, res)=>{
    const { tipo_factura, ClientId, OrderId } = req.body;
    try {
        const newFactura = await createFactura(tipo_factura, ClientId, OrderId);
        res.status(200).send(newFactura);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

module.exports = createFacturaHandler;