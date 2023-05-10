const { Order } = require("../../db");

async function getAllClientOrders(id) {
  const allClientOrders = await Order.findAll({ where: { ClientId: id } });
  return allClientOrders;
}

module.exports = getAllClientOrders;
