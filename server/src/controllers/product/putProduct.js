const { Product } = require("../../db");

const updateProduct = async (nombre, descripcion, precio, stock) => {
  const putProduct = await Product.findByPk(id);

  if (!putProduct) throw Error(`el id:${id}no existe`);

  if (!nombre || !descripcion || !precio || !stock) {
    throw Error(`fallo la accion `);
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
  return `${nombre} se actualizo`;
};

module.exports = { updateProduct, };
