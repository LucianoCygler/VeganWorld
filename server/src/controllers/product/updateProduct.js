const { Product } = require("../../db");

const updateProduct = async (id, nombre, descripcion, precio, stock, imagen) => {
  const productById = await Product.findByPk(id);
  if (!productById)
    throw new Error({
      error: `No se encontro  con el id ${id} ningun producto `,
    });

  if (nombre) productById.nombre = nombre;
  if (descripcion) productById.descripcion = descripcion;
  if (precio) productById.precio = precio;
  if (stock) productById.stock = stock;
  if (imagen) productById.imagen = imagen;

  await productById.save();

  return productById;
};
 
module.exports = updateProduct;
