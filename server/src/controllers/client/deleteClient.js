const { Client } = require("../../db");

async function deleteClient(id) {
  const client = await Client.findOne({ where: { id } });
  if (!client) {
    throw new Error(`A customer with the ID ${id} was not found.`);
  }
  await client.destroy();
  return `The customer with ID ${id} was successfully deleted.`;
}

module.exports = deleteClient;
