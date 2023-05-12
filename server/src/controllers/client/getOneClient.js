const { Client } = require("../../db");

async function getOneClient(id) {
  const client = await Client.findByPk(id);

  return client;
}

module.exports = getOneClient;
