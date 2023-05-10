const getOneFactura = require('../../controllers/factura/getOneFactura');

const getOneFacturaHandler = async (req, res) => {
    const {id} = req.params;
    try {
        if (!id){
            res.status(400).send('Por favor proporcione un id');
            return;
        }
        const factura = await getOneFactura(id);
        res.status(200).send(factura);
    } catch (error) {
        res.status(500).send(`${error.message}`);
    }
}

module.exports = getOneFacturaHandler;
