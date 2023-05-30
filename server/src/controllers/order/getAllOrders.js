const { Order } = require("../../db");

async function getAllOrders() {
  const allOrders = await Order.findAll({ paranoid: false });
  return allOrders;
}

module.exports = getAllOrders;
