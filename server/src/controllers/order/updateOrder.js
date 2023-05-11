const { Order } = require("../../db");

const updateOrder = async (id, importe, productos) => {
  const order = await Order.findOne({ where: { id } });
  if (!order) {
    throw new Error(`No se encontró un order con el id ${id}`);
  }
  if (importe) order.importe = importe;
  if (productos) order.productos = productos;

  await order.save();
  return order;
};

module.exports = updateOrder;
