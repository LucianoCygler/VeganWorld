const { Router } = require("express");

const router = Router();

const adminRouter = require("./routerAdmin");

const clientRouter = require("./routerCliente");
const productRouter = require("./routerProduct");

router.use("/admin", adminRouter);
router.use("/client", clientRouter);
router.use("/product", productRouter);


module.exports = router;
