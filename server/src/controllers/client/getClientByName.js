const { Client } = require("../../db");
const { Op } = require("sequelize");

async function getClientByName(nombre) {
  const client = await Client.findAll({
    where: { nombre: { [Op.iLike]: `%${nombre}%` } },
  });
  console.log(client);
  if (client.length === 0)
    throw new Error(`El nombre ${nombre} no se encontró en la base de datos`);
  return client;
}

module.exports = getClientByName;
