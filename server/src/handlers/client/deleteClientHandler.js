const deleteClient = require("../../controllers/client/deleteClient");

const deleteClientHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedClient = await deleteClient(id);

    res.status(200).send(deletedClient);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = deleteClientHandler;
