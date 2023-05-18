const { Router } = require("express");
const contactUsHandler = require("../handlers/mailer/contactUsHandler");


const mailerRouter = Router();

mailerRouter.post("/", contactUsHandler);

module.exports = mailerRouter;