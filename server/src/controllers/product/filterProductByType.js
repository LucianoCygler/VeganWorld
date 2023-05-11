const { Product } = require("../../db");

const filterProductByType = async (filterByType, orderedProduct) => {
  const filtered = await Product.findAll({ where: { tipo: filterByType } });
  if (!filtered) throw new Error(`No hay productos del tipo ${filterByType}`);
  orderedProduct = filtered;
  return orderedProduct;
};

module.exports = filterProductByType;
