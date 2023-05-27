const getOneClient = require("../../controllers/client/getOneClient");
const createPageReview = require("../../controllers/pagereview/createPageReview");

const createPageReviewHandler = async (req, res) => {
  const { titulo, descripcion, cliente_id } = req.body;
  try {
    const client = await getOneClient(cliente_id);
    if (!client) throw new Error(`Client id ${cliente_id} doesn´t exist`);
    const cliente_nombre = client.nombre;
    const cliente_imagen = client.imagen;
    const newPageReview = await createPageReview(
      titulo,
      descripcion,
      cliente_id,
      cliente_nombre,
      cliente_imagen
    );
    res.status(200).send(newPageReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = createPageReviewHandler;
