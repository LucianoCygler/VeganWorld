const { Product } = require("../../db");

async function getAllProducts() {
  const allProducts = await Product.findAll();
  return allProducts;
}

module.exports = getAllProducts;