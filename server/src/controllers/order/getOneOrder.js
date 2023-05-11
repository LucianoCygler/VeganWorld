const { Order } = require("../../db");

async function getOneOrder(id) {
  const order = await Order.findByPk(id);
  if (!order) throw new Error(`El id ${id} no tiene pedidos`);
  return order;
}

module.exports = getOneOrder;
