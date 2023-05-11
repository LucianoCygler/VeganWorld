const { Router } = require("express");

const productRouter = Router();

const getProductsHandler = require("../handlers/product/getProductsHandler");
const getOneProductHandler = require("../handlers/product/getOneProductHandler");
const createProductHandler = require("../handlers/product/createProductHandler");
const deleteProductHandler = require("../handlers/product/deleteProductHandler");
const updateProductHandler = require("../handlers/product/updateProductHandler");
const orderFilterProductHandler = require("../handlers/product/productByPriceHandler");

productRouter.get("/", getProductsHandler);

productRouter.get("/:id", getOneProductHandler);

productRouter.post("/", createProductHandler);

productRouter.delete("/:id", deleteProductHandler);

productRouter.delete("/:id", deleteProductHandler);

productRouter.patch("/:id", updateProductHandler);

module.exports = productRouter;
