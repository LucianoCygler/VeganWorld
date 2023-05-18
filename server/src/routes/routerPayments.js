const { Router } = require("express");
const checkoutHandler = require("../handlers/checkout/checkoutHandler");

const PaymentController = require("../controllers/payment/PaymentController");
const PaymentService = require("../Services/PaymentService");

const PaymentInstance = new PaymentController(new PaymentService());

const paymentRouter = Router();

paymentRouter.post("/", (req, res, next) => {
  PaymentInstance.getPaymentLink(req, res, next);
});

module.exports = paymentRouter;
