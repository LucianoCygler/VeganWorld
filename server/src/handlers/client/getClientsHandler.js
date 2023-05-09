const getAllClients = require("../../controllers/client/getAllClients");
const getClientByName = require("../../controllers/client/getClientByName");

const getClientsHandler = async (req, res) => {
  const { nombre } = req.query;
  try {
    if (nombre) {
      const client = await getClientByName(nombre);
      if (client) return res.status(200).send(client);
    }
    const allClients = await getAllClients();
    res.status(200).send(allClients);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getClientsHandler;
