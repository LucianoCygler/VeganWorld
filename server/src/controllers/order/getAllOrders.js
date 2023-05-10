const { Order } = require("../../db");

async function getAllOrders() {
  const allOrders = await Order.findAll();
  return allOrders;
}

module.exports = getAllOrders;
