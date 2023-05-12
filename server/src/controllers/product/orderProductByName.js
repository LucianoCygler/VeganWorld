const { Product } = require("../../db");

const orderProductByName = (sortByName, orderedProduct) => {
  if (sortByName === "asc") {
    orderedProduct.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1;
      }
      if (a.nombre < b.nombre) {
        return -1;
      }
      return 0;
    });
  } else if (sortByName === "desc") {
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

module.exports = orderProductByName;
