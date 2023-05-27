const { Client } = require("../../db");

async function getAllClients() {
  const allClients = await Client.findAll({ paranoid: false });
  return allClients;
}

module.exports = getAllClients;
