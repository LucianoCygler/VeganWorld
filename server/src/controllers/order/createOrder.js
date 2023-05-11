const { Order, Product } = require("../../db");
const getDireccion = require("./getDireccion");

async function createOrder(importe, cliente_id, productos) {
  const fecha = new Date().toISOString().slice(0, 10);

  const direccion = await getDireccion(cliente_id);

  const order = await Order.create({
    importe,
    fecha,
    direccion,
  });

  await order.setClient(cliente_id);

  for (const productoId of productos) {
    const producto = await Product.findByPk(productoId);
    if (producto) {
      await order.addProduct(producto);
    }
  }

  return order;
}

module.exports = createOrder;
