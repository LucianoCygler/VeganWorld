const deleteClient = require("../../controllers/client/deleteClient");

const deleteClientHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteClient(id, { deleted: true });

    res.status(200).send(`The customer with ID ${id} was marked as deleted.`);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = deleteClientHandler;
