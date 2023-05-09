const { Client } = require("../../db");

async function deleteClient(id) {
  const client = await Client.findOne({ where: { id } });
  if (!client) {
    throw new Error(`No se encontró un cliente con el id ${id}`);
  }
  await client.destroy();
  return `el cliente con el id ${id} fue eliminado correctamente`;
}

module.exports = deleteClient;
