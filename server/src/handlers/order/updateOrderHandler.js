const updateOrder = require("../../controllers/order/updateOrder");

async function updateOrderHandler(req, res) {
  const { id, importe, productos, estado } = req.body;
  try {
    const modifiedOrder = await updateOrder(id, importe, productos, estado);
    res.status(200).send(modifiedOrder);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
}
module.exports = updateOrderHandler;
