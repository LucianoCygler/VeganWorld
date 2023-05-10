const updateOrder = require("../../controllers/order/updateOrder");

async function updateOrderHandler(req, res) {
  const { id } = req.params;
  const { usuario, contraseña } = req.body;
  try {
    const modifiedAdmin = await updateOrder(id, usuario, contraseña);
    res.status(200).send(modifiedAdmin);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
}
module.exports = updateOrderHandler;
