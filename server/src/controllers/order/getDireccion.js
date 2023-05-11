const getOneClient = require("../client/getOneClient");

async function getDireccion(cliente_id) {
  const client = await getOneClient(cliente_id);
  const direccion = client.direccion;
  return direccion;
}
module.exports = getDireccion;
