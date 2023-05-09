const getClientById = require("../../controllers/client/getClientById");

const getOneClientHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Por favor proporcione un id");
      return;
    }
    const client = await getClientById(id);
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOneClientHandler;
