const updateProduct = require("../../controllers/product/putProduct");

const putProductHandler = async (req, res) => {
  const { id } = req.params;
  let { nombre, descripcion, precio, stock } = req.body;
  console.log(id);
  try {
    const putProduct = await updateProduct(
      nombre,
      descripcion,
      precio,
      stock,
      id
    );
    res.status(200).json(putProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putProductHandler;
