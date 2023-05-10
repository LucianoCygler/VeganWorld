const getFacturas = require ('../handlers/factura/getFacturasHandler.js');
const getOneFacturaHandler = require ('../handlers/factura/getOneFacturaHandler');
const createFacturaHandler = require('../handlers/factura/createFacturaHandler');
const deleteFacturaHandler = require('../handlers/factura/deleteFacturaHandler');

const { Router } = require("express");

const facturaRouter = Router();

facturaRouter.get('/', getFacturas);

facturaRouter.get('/:id', getOneFacturaHandler);

facturaRouter.post('/', createFacturaHandler);

facturaRouter.delete('/:id', deleteFacturaHandler);

module.exports = facturaRouter;
