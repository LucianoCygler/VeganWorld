const {
  orderProductByPrice,
  orderProductByTipo,
  orderProductByName,
} = require("../../controllers/product/orderByPriceProduct");

const orderProductHandler = async (req, res) => {
  const { precio, tipo, nombre } = req.query;
  try {
    if (precio) {
      const orderedProduct = await orderProductByPrice(precio);
      return res.send(orderedProduct);
    }
    if (tipo) {
      const orderedProduct = await orderProductByTipo(tipo);
      return res.send(orderedProduct);
    }
    if (nombre) {
      const orderedProduct = await orderProductByName(nombre);
      return res.send(orderedProduct);
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = orderProductHandler;
