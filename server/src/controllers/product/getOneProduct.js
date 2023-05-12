const { Product } = require("../../db");

async function getOneProduct(id) {
  const product = await Product.findByPk(id);

  return product;
}

module.exports = getOneProduct;
