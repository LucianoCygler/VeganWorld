const { Product } = require("../../db");

const createProduct = async (nombre, descripcion, precio, stock, imagen) => {
  const product = await Product.create({
    nombre,
    descripcion,
    precio,
    stock,
    imagen,
  });
  return product;
};

module.exports = createProduct;
