const deleteProduct = require("../../controllers/product/deleteProduct");

const deleteProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await deleteProduct(id, { deleted: true });

    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = deleteProductHandler;
