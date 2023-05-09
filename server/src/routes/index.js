const { Router } = require("express");

const router = Router();


const admin = require("./routerAdmin");
const client = require("./routerCliente");
const product = require("./routerProduct");


router.use("/admin",admin);
router.use("/client",client);
router.use("/product",product);

module.exports = router


