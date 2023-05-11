const { Product } = require("../../db");

const orderProductByPrice = async (sortByPrice, orderedProduct) => {
  if (sortByPrice === "asc") {
    orderedProduct.sort((a, b) => a.precio - b.precio);
  } else if (sortByPrice === "desc") {
    orderedProduct.sort((a, b) => b.precio - a.precio);
  }
  return orderedProduct;
};

module.exports = orderProductByPrice;
