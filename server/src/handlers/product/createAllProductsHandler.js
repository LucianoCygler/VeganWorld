const createProduct = require("../../controllers/product/createProduct");

const createAllProductsHandler = async (req, res) => {
  const products = req.body;
  try {
    const newProducts = await createProduct(products);
    res.status(200).send(newProducts);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createAllProductsHandler;
