const getAllClients = require("../../controllers/client/getAllClients");

const getClientsHandler = async (req, res) => {
  try {
    const allClients = await getAllClients();
    res.status(200).send(allClients);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getClientsHandler;
