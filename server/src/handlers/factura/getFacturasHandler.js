const getAllFacturas = require('../../controllers/factura/getAllFacturas');

const getFacturas = async (req, res)=>{
    try {
        const allFacturas = await getAllFacturas();
        res.status(200).send(allFacturas);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

module.exports = getFacturas;