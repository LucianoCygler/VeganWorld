const { handlerAdmin } = require("../handlers");

const { Router } = require("express");

const admin = Router();

admin.get("/", handlerAdmin);

module.exports = admin;
