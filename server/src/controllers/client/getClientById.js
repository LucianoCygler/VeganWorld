const { Client } = require("../../db");

async function getClientById(id) {
  const client = await Client.findByPk(id);
  if (!client)
    throw new Error(`El id ${id} no se encontró en la base de datos`);
  return client;
}

module.exports = getClientById;
