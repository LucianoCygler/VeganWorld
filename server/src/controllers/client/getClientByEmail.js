const { Client } = require("../../db");
async function getClientByEmail(email) {
  const client = await Client.findOne({
    where: { email: email },
  });

  if (!client) {
    throw new Error("No existe email");
  }
  return client;
}

module.exports = getClientByEmail;
