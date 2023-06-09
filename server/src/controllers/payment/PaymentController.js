class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }

  async getPaymentLink(req, res) {
    try {
      const { email, products } = req.body;
      const payment = await this.subscriptionService.createPayment(
        email,
        products
      );

      return res.json(payment.init_point);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }

  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription();

      return res.json(subscription);
    } catch (error) {
      return res
        .status(500)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }
}

module.exports = PaymentController;
