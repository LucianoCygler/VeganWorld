const { Client } = require("../../db");
async function getClientByEmail(email) {
  const client = await Client.findOne({
    where: { email: email },
  });

  return client;
}

module.exports = getClientByEmail;
