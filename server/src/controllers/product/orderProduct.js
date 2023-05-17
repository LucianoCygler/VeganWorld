const { Product } = require("../../db");

const orderProduct = async (sort, orderedProduct) => {
  if (sort === "Mayor precio") {
    orderedProduct.sort((a, b) => a.precio - b.precio);
  } else if (sort === "Menor precio") {
    orderedProduct.sort((a, b) => b.precio - a.precio);
  } else if (sort === "a-z") {
    orderedProduct.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
  } else if (sort === "z-a") {
    orderedProduct.sort((a, b) => {
      if (a.nombre < b.nombre) {
        return 1;
      }
      if (a.nombre > b.nombre) {
        return -1;
      }
      return 0;
    });
  }
  return orderedProduct;
};

module.exports = orderProduct;
