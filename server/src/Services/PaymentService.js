const axios = require("axios");

class PaymentService {
  async createPayment(email, products) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      payer_email: email, //"test_user_800344324@testuser.com",
      items: products,
      //[
      // {
      //   title: "Ravioles Veganos",
      //   description: "Dummy description",
      //   picture_url: "http://www.myapp.com/myimage.jpg",
      //   category_id: "category123",
      //   quantity: 1,
      //   unit_price: 120,
      // },
      // {
      //   title: "Menu Veganisimo Especila",
      //   description: "Dummy description",
      //   picture_url: "http://www.myapp.com/myimage.jpg",
      //   category_id: "category123",
      //   quantity: 1,
      //   unit_price: 140,
      // },
      // {
      //   title: "Barrita de cereales",
      //   description: "Dummy description",
      //   picture_url: "http://www.myapp.com/myimage.jpg",
      //   category_id: "category123",
      //   quantity: 10,
      //   unit_price: 80,
      // },
      // {
      //   title: "Jugo verganeitor",
      //   description: "Dummy description",
      //   picture_url: "http://www.myapp.com/myimage.jpg",
      //   category_id: "category123",
      //   quantity: 5,
      //   unit_price: 40,
      // },
      // ],
      back_urls: {
        failure: "http://localhost:3000/MyOrders",
        pending: "http://localhost:3000/MyOrders",
        success: "http://localhost:3000/MyOrders",
        //success: "/success",
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return payment.data;
  }

  async createSubscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción de ejemplo",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 10,
        currency_id: "ARS",
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_46945293@testuser.com",
    };

    const subscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    return subscription.data;
  }
}

module.exports = PaymentService;
