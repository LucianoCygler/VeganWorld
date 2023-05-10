const { Product } = require("../../db");

async function getOneProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) throw new Error(`El id ${id} no se encontró en la base de datos`);
  return product;
}

module.exports = getOneProduct;