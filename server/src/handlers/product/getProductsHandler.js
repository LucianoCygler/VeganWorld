const getAllProducts = require("../../controllers/product/getAllProducts");
const getProductByName = require("../../controllers/product/getProductByName");


const getProductsHandler = async (req, res) => {
  const { nombre } = req.query
  try {
    if ( nombre ) {
      const product = await getProductByName(nombre)
      return res.status(200).send(product)

    }
    const allProducts = await getAllProducts();
    res.status(200).send(allProducts);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getProductsHandler;