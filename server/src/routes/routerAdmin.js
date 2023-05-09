const getAdminsHandler = require("../handlers/admin/getAdminsHandler");
const getOneAdminHandler = require("../handlers/admin/getOneAdminHandler");
const createAdminHandler = require("../handlers/admin/createAdminHandler");
const deleteAdminHandler = require("../handlers/admin/deleteAdminHandler");
const { Router } = require("express");

const adminRouter = Router();

adminRouter.get("/", getAdminsHandler);

adminRouter.get("/:id", getOneAdminHandler);

adminRouter.post("/", createAdminHandler);

adminRouter.delete("/:id", deleteAdminHandler);

module.exports = adminRouter;
