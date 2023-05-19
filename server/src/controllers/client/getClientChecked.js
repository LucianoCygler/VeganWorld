const { Client } = require("../../db");
const bcrypt = require("bcrypt");

async function getClientChecked(email) {
  const client = await Client.findOne({
    where: { email: email },
  });

  if (!client) {
    throw new Error("Dirección de correo electrónico desconocida");
  }

  // const isMatch = await bcrypt.compare(contraseña, client.contraseña);

  // if (!isMatch) {
  //   throw new Error("Contraseña incorrecta");
  // }

  return client;
}

module.exports = getClientChecked;
