const getAdminsHandler = require("../handlers/admin/getAdminsHandler");
const getOneAdminHandler = require("../handlers/admin/getOneAdminHandler");
const createAdminHandler = require("../handlers/admin/createAdminHandler");
const deleteAdminHandler = require("../handlers/admin/deleteAdminHandler");
const updateAdminHandler = require("../handlers/admin/updateAdminHandler");
const getAdminCheckedHandler = require("../handlers/admin/getAdminCheckedHandler");

const { Router } = require("express");

const adminRouter = Router();

adminRouter.get("/", getAdminsHandler);

adminRouter.get("/:id", getOneAdminHandler);

adminRouter.post("/", createAdminHandler);

adminRouter.delete("/:id", deleteAdminHandler);

adminRouter.patch("/:id", updateAdminHandler);

adminRouter.post("/checkadmin/", getAdminCheckedHandler);

module.exports = adminRouter;
