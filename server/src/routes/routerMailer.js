const { Router } = require("express");
const mailerHandler = require("../handlers/mailer/mailerHandler");


const mailerRouter = Router();

mailerRouter.post("/", mailerHandler);

module.exports = mailerRouter;