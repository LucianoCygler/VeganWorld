const { Client } = require("../../db");
async function getClientByName(nombre) {
  const client = await Client.findOne({
    where: { nombre: nombre },
  });

  return client;
}

module.exports = getClientByName;
