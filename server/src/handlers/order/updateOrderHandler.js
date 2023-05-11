const updateOrder = require("../../controllers/order/updateOrder");

async function updateOrderHandler(req, res) {
  const { id } = req.params;
  const { importe, productos } = req.body;
  try {
    const modifiedOrder = await updateOrder(id, importe, productos);
    res.status(200).send(modifiedOrder);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
}
module.exports = updateOrderHandler;
