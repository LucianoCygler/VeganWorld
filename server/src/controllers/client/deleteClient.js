const { Client } = require("../../db");

async function deleteClient(id, data) {
  const client = await Client.findOne({ where: { id } });
  if (!client) {
    throw new Error(`A customer with the ID ${id} was not found.`);
  }
  await client.update(data);
  await client.destroy({ force: false });
  return `The customer with ID ${id} was successfully marked as deleted.`;
}

module.exports = deleteClient;
