const createProduct = require("../../controllers/product/createProduct");
const getProductByName = require("../../controllers/product/getProductByName");

const createProductHandler = async (req, res) => {
  const { nombre, descripcion, precio, stock, imagen } = req.body;
  try {
    const newProduct = await createProduct(
      nombre,
      descripcion,
      precio,
      stock,
      imagen
    );
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createProductHandler;
