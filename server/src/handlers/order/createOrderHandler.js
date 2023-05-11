const createOrder = require("../../controllers/order/createOrder");
const getOneClient = require("../../controllers/client/getOneClient");

const createOrderHandler = async (req, res) => {
  const { importe, cliente_id, productos } = req.body;

  try {
    if (cliente_id && importe && productos) {
      const client = await getOneClient(cliente_id);
      if (client) {
        const newOrder = await createOrder(importe, cliente_id, productos);
        return res.status(200).send(newOrder);
      } else {
        return res
          .status(400)
          .send(`El id ${cliente_id} no se encontró en la base de datos`);
      }
    } else {
      return res.status(400).send("Faltan datos para crear el pedido");
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createOrderHandler;
