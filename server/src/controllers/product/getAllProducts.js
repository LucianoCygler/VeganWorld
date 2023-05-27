const { Product } = require("../../db");

async function getAllProducts() {
  const allProducts = await Product.findAll({ paranoid: false });
  return allProducts;
}

module.exports = getAllProducts;
