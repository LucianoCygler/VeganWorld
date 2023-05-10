const { Order } = require("../../db");
async function createOrder(importe, cliente_id, productos) {
  const fecha = new Date().toISOString().slice(0, 10);

  const order = await Order.create({
    importe,
    fecha,
    productos,
  });

  await order.setClient(cliente_id);
  return order;
}

module.exports = createOrder;
