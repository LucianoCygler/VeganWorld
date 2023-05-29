const { Client } = require("../../db");

async function getAllClientsAdmin() {
  const allClients = await Client.findAll({ paranoid: false });
  return allClients;
}

module.exports = getAllClientsAdmin;
