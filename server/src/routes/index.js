const { Router } = require("express");

const router = Router();

const adminRouter = require("./routerAdmin");
const reviewRouter = require("./routerReview");
const clientRouter = require("./routerClient");
const productRouter = require("./routerProduct");
const favoriteRouter = require("./routerFavorite");
const orderRouter = require("./routerOrder");
const facturaRouter = require("./routerFactura");
const pageReviewRouter = require("./routerPageReview");
const routerPayments = require("./routerPayments");
const mailerRouter = require("./routerMailer");
const getAdminRouter = require("./routerGetAdmin");

router.use("/admin", adminRouter);
router.use("/review", reviewRouter);
router.use("/client", clientRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/factura", facturaRouter);
router.use("/favorite", favoriteRouter);
router.use("/pagereview", pageReviewRouter);
router.use("/payment", routerPayments);
router.use("/mail", mailerRouter);
router.use("/getadmin", getAdminRouter);

module.exports = router;
