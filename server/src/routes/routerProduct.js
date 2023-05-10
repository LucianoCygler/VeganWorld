const { Router } = require("express");
const getProductsHandler = require("../handlers/product/getProductsHandler");
const getOneProductHandler = require("../handlers/product/getOneProductHandler");
const createProductHandler = require("../handlers/product/createProductHandler");
const deleteProductHandler = require("../handlers/product/deleteProductHandler");
const putProductHandler = require("../handlers/product/putProductHandler");

const productRouter = Router();

productRouter.get("/", getProductsHandler);

productRouter.get("/:id", getOneProductHandler);

productRouter.post("/", createProductHandler);

productRouter.delete("/:id", deleteProductHandler);

productRouter.patch("/:id", putProductHandler);

module.exports = productRouter;
