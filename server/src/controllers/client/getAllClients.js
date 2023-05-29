const { Client } = require("../../db");

async function getAllClients() {
  const allClients = await Client.findAll();
  return allClients;
}

module.exports = getAllClients;
