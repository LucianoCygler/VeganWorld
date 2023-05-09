const { Client } = require("../../db");
async function createClient(
  email,
  contraseña,
  nombre,
  apellido,
  ciudad,
  direccion,
  telefono,
  edad,
  dni
) {
  const client = await Client.create({
    email,
    contraseña,
    nombre,
    apellido,
    ciudad,
    direccion,
    telefono,
    edad,
    dni,
  });
  return client;
}

module.exports = createClient;
