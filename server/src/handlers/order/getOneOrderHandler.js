const getOneOrder = require("../../controllers/order/getOneOrder");

const getOneOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Por favor proporcione un id");
      return;
    }
    const order = await getOneOrder(id);
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOneOrderHandler;
