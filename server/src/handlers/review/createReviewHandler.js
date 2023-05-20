const createReview = require("../../controllers/review/createReview");
const getOneClient = require("../../controllers/client/getOneClient");

const createReviewHandler = async (req, res) => {
  const { titulo, descripcion, estrellas, cliente_id, product_id } = req.body;
  try {
    const client = await getOneClient(cliente_id);
    if (!client) throw new Error(`Client id ${cliente_id} doesn´t exist`);
    const cliente_nombre = client.nombre;
    const newReview = await createReview(
      titulo,
      descripcion,
      estrellas,
      cliente_id,
      product_id,
      cliente_nombre
    );
    res.status(200).send(newReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = createReviewHandler;
