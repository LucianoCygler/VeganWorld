const { Product } = require("../../db");

const deleteProduct = async (id) => {
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    throw new Error(`Product with the ID ${id} was not found.`);
  }
  await product.destroy();
  return `The product with ID ${id} was successfully deleted`;
};

module.exports = deleteProduct;
