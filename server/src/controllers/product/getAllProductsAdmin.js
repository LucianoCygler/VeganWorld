const { Product } = require("../../db");

async function getAllProductsAdmin() {
  const allProducts = await Product.findAll({ paranoid: false });
  return allProducts;
}

module.exports = getAllProductsAdmin;
