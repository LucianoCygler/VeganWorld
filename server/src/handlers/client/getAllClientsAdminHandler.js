const getAllClients = require("../../controllers/client/getAllClients");
const getAllClientsAdmin = require("../../controllers/client/getAllClientsAdmin");
const getClientByEmail = require("../../controllers/client/getClientByEmail");
const getClientByName = require("../../controllers/client/getClientByName");

const getAllClientsAdminHandler = async (req, res) => {
  const { nombre, email } = req.query;
  try {
    if (nombre) {
      const client = await getClientByName(nombre);
      return res.status(200).send(client);
    }
    if (email) {
      const client = await getClientByEmail(email);
      if (client) return res.status(200).send(client);
    }
    const allClients = await getAllClientsAdmin();
    res.status(200).send(allClients);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAllClientsAdminHandler;
