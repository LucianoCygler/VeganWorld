const { Product } = require("../../db");

const createProduct = async (nombre, descripcion, precio, stock) => {
  const product = await Product.create({ nombre, descripcion, precio, stock });
  return product;
}

module.exports = createProduct;
