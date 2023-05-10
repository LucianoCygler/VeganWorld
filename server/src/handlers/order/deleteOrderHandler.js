const deleteOrder = require("../../controllers/order/deleteOrder");

const deleteOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await deleteOrder(id);

    res.status(200).send(deletedOrder);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = deleteOrderHandler;
