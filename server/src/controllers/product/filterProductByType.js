const { Product } = require("../../db");

const filterProductByType = async (filterByType) => {
  const filtered = await Product.findAll({ where: { tipo: filterByType } });

  if (filtered.length === 0)
    throw new Error(`There are no products of type ${filterByType}.`);
  return filtered;
};

module.exports = filterProductByType;
