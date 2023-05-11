const { Client } = require("../../db");
async function getClientChecked(email, contraseña) {
  const client = await Client.findOne({
    where: { email: email, contraseña: contraseña },
  });

  return client;
}

module.exports = getClientChecked;
