const { Client } = require("../../db");

async function getClientByName(nombre) {
  const client = await Client.findAll({ where: { nombre } });
  if (!client)
    throw new Error(`El nombre ${id} no se encontró en la base de datos`);
  return client;
}

module.exports = getClientByName;
