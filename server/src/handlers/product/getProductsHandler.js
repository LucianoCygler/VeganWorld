const filterProductByType = require("../../controllers/product/filterProductByType");
const getAllProducts = require("../../controllers/product/getAllProducts");
const getProductByName = require("../../controllers/product/getProductByName");
const orderProductByName = require("../../controllers/product/orderProductByName");
const orderProductByPrice = require("../../controllers/product/orderProductByPrice");

const getProductsHandler = async (req, res) => {
  const { nombre, sortByPrice, sortByName, filterByType } = req.query;
  try {
    let orderedProduct = await getAllProducts();

    if (nombre) {
      const product = await getProductByName(nombre);
      return res.status(200).send(product);
    }
    if (filterByType) {
      orderedProduct = await filterProductByType(filterByType, orderedProduct);
    }
    if (sortByPrice) {
      orderedProduct = await orderProductByPrice(sortByPrice, orderedProduct);
    }

    if (sortByName) {
      orderedProduct = await orderProductByName(sortByName, orderedProduct);
    }

    res.status(200).send(orderedProduct);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getProductsHandler;
