const { Router } = require("express");
const getOrdersHandler = require("../handlers/order/getOrdersHandler");
const createOrderHandler = require("../handlers/order/createOrderHandler");
const getOneOrderHandler = require("../handlers/order/getOneOrderHandler");
const deleteOrderHandler = require("../handlers/order/deleteOrderHandler");
const updateOrderHandler = require("../handlers/order/updateOrderHandler");

const orderRouter = Router();

orderRouter.get("/", getOrdersHandler);

orderRouter.get("/:id", getOneOrderHandler);

orderRouter.post("/", createOrderHandler);

orderRouter.delete("/:id", deleteOrderHandler);

orderRouter.patch("/:id", updateOrderHandler);

module.exports = orderRouter;
