const { Order } = require("../../db");

async function getOneOrder(id) {
  const order = await Order.findByPk(id);
  if (!order) throw new Error(`El id ${id} no se encontró en la base de datos`);
  return order;
}

module.exports = getOneOrder;
