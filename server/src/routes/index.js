const { Router } = require("express");

const router = Router();

const adminRouter = require("./routerAdmin");
const reviewRouter = require("./routerReview");
const clientRouter = require("./routerClient");
const productRouter = require("./routerProduct");

const orderRouter = require("./routerOrder");

const facturaRouter = require("./routerFactura");

router.use("/admin", adminRouter);
router.use("/review", reviewRouter);
router.use("/client", clientRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/factura", facturaRouter);

module.exports = router;
