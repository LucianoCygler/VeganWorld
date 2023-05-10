const { Router } = require("express");
const getOrdersHandler = require("../handlers/order/getOrdersHandler");
const createOrderHandler = require("../handlers/order/createOrderHandler");
const getOneOrderHandler = require("../handlers/order/getOneOrderHandler");

const orderRouter = Router();

orderRouter.get("/", getOrdersHandler);

orderRouter.get("/:id", getOneOrderHandler);

orderRouter.post("/", createOrderHandler);

orderRouter.delete("/:id", createOrderHandler);

module.exports = orderRouter;
