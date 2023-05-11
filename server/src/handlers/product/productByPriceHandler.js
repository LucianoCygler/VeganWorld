const orderProductByTipo = require("../../controllers/product/filterByType");
const orderProductByPrice = require("../../controllers/product/orderProductByPrice");
const orderProductByName = require("../../controllers/product/orderProductByName");
const getAllProducts = require("../../controllers/product/getAllProducts");

const orderFilterProductHandler = async (req, res) => {
  //        asc o des -  ?   - asc o desc
  const { precioOrder, tipo, nombreOrder } = req.query;
  const orderedProduct = await getAllProducts();
  console.log(precioOrder);
  console.log(orderedProduct);

  try {
    if (tipo) {
      orderedProduct = await orderProductByTipo(tipo, orderedProduct);
    }
    if (precioOrder) {
      orderedProduct = await orderProductByPrice(precioOrder, orderedProduct);
    }

    if (nombreOrder) {
      orderedProduct = await orderProductByName(nombreOrder, orderedProduct);
    }

    res.status(200).send(orderedProduct);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = orderFilterProductHandler;
