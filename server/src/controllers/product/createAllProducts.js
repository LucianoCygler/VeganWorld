const { Product } = require("../../db");

const createAllProducts = async (products) => {
  const createdProducts = await Product.bulkCreate(products);
  return createdProducts;
};

module.exports = createAllProducts;
