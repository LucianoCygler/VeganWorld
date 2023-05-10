const getAllClientOrders = require("../../controllers/client/getAllClientOrders");

const getAllClientOrdersHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const allOrders = await getAllClientOrders(id);
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAllClientOrdersHandler;
