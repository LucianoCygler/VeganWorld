const { Order, Product } = require("../../db");
const getDireccion = require("./getDireccion");

function contarRepeticiones(array) {
  return array.reduce((contador, elemento) => {
    contador[elemento] = (contador[elemento] || 0) + 1;
    return contador;
  }, {});
}

async function createOrder(importe, cliente_id, productos, direccion) {
  const fecha = new Date().toISOString().slice(0, 10);

  const productosNames = await Promise.all(
    productos.map(async (productoID) => {
      const productDB = await Product.findOne({ where: { id: productoID } });
      return productDB?.nombre;
    })
  );
  const repeticiones = contarRepeticiones(productosNames);

  const productosConCantidad = Object.entries(repeticiones).map(
    ([nombre, cantidad]) => {
      return `${cantidad} ${nombre}`;
    }
  );

  const order = await Order.create({
    importe,
    fecha,
    direccion,
    productos: productosConCantidad,
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
