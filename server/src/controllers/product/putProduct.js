const { Product } = require("../../db");

const updateProduct = async (nombre, descripcion, precio, stock, id) => {
  const putProduct = await Product.findByPk(id);

  if (!putProduct) throw Error(`The ID: ${id} does not exist`);

  if (!nombre || !descripcion || !precio || !stock) {
    throw Error(`Data is missing for updating `);
  }
  await Product.update(
    {
      nombre,
      descripcion,
      precio,
      stock,
    },
    {
      where: {
        id,
      },
    }
  );
  return `${nombre}, It has been updated`;
};

module.exports = updateProduct;
