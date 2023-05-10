const updateProduct = require("../../controllers/product/updateProduct");

const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, imagen } = req.body;

  try {
    const product = await updateProduct(
      id,
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProductHandler;
