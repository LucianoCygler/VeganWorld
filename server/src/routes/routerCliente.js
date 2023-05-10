const { Router } = require("express");
const createClientHandler = require("../handlers/client/createClientHandler");
const deleteClientHandler = require("../handlers/client/deleteClientHandler");
const getClientsHandler = require("../handlers/client/getClientsHandler");
const getOneClientHandler = require("../handlers/client/getOneClientHandler");
const updateClientHandler = require("../handlers/client/updateClientHandler");
const getAllClientOrdersHandler = require("../handlers/client/getAllClientOrdersHandler");

const clientRouter = Router();

clientRouter.get("/", getClientsHandler);

clientRouter.get("/:id", getOneClientHandler);

clientRouter.post("/", createClientHandler);

clientRouter.delete("/:id", deleteClientHandler);

clientRouter.patch("/:id", updateClientHandler);

clientRouter.get("/orders/:id", getAllClientOrdersHandler);

module.exports = clientRouter;
