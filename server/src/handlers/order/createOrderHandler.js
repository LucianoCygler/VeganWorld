const createOrder = require("../../controllers/order/createOrder");

const createOrderHandler = async (req, res) => {
  const { importe, cliente_id, productos } = req.body;

  try {
    const newOrder = await createOrder(importe, cliente_id, productos);
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createOrderHandler;
