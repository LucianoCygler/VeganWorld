const { Product } = require("../../db");

 const  deleteProduct = async(id) => {
  const product = await Product.findOne({ where: { id } });
  if (!product) {
    throw new Error(`No se encontró product con el id ${id}`);
  }
  await product.destroy();
  return `El Producto con el id ${id} fue eliminado correctamente`;
}

module.exports = deleteProduct;