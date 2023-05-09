const { handlerClient } = require("../handlers");
const { Router } = require("express");

const client = Router();

client.get("/", handlerClient);

module.exports = client;
