const getOneClient = require("../../controllers/client/getOneClient");

const getOneClientHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Por favor proporcione un id");
      return;
    }

    const client = await getOneClient(id);
    if (!client)
      throw new Error(`El id ${id} no se encontró en la base de datos`);
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOneClientHandler;
