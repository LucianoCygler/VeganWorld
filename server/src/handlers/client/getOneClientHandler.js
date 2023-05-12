const getOneClient = require("../../controllers/client/getOneClient");

const getOneClientHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Please provide an ID.");
      return;
    }

    const client = await getOneClient(id);
    if (!client) throw new Error(`The ID ${id} was not found in the database.`);
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOneClientHandler;
