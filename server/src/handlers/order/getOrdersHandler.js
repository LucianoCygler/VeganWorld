const getAllOrders = require("../../controllers/order/getAllOrders");

const getOrdersHandler = async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOrdersHandler;
