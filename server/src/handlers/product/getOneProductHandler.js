const getOneProduct = require("../../controllers/product/getOneProduct");

const getOneProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Por favor proporcione un id");
      return;
    }
    const product = await getOneProduct(id);
    if (!product)
      throw new Error(
        `El producto id ${id} no se encontró en la base de datos`
      );
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOneProductHandler;
