const { Product } = require("../../db");

const createProduct = async (
  nombre,
  tipo,
  descripcion,
  precio,
  stock,
  imagen
) => {
  if(nombre && tipo && descripcion && precio && stock&& imagen){

    const product = await Product.create({
      nombre,
      tipo,
      descripcion,
      precio,
      stock,
      imagen,
    });
    return product;
  } else {
    throw Error ('You must complete all required fields *')
  }
};

module.exports = createProduct;
