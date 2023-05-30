const { Router } = require("express");
const getProductsAdminHandler = require("../handlers/product/getProductsAdminHandler");
const getAllClientsAdminHandler = require("../handlers/client/getAllClientsAdminHandler");

const getAdminRouter = Router();

getAdminRouter.get("/products", getProductsAdminHandler);
getAdminRouter.get("/clients", getAllClientsAdminHandler);

module.exports = getAdminRouter;
