const { Order } = require("../../db");

async function deleteOrder(id) {
  const order = await Order.findOne({ where: { id } });
  if (!order) {
    throw new Error(`No se encontró un order con el id ${id}`);
  }
  await order.destroy();
  return `el order con el id ${id} fue eliminado correctamente`;
}

module.exports = deleteOrder;
