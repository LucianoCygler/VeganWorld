const { Router } = require("express");

const router = Router();

const adminRouter = require("./routerAdmin");
const clientRouter = require("./routerCliente");
const productRouter = require("./routerProduct");
const orderRouter = require("./orderRouter");

router.use("/admin", adminRouter);
router.use("/client", clientRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);

module.exports = router;
