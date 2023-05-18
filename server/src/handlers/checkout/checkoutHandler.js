const checkout = require("../../controllers/payment/PaymentController");

const checkoutHandler = (req, res) => {
  checkout(req, res);
};
module.exports = checkoutHandler;
