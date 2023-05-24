const { Client } = require("../../db");
const bcrypt = require("bcrypt");

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
  //const saltRounds = 10;
  // const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

  const client = await Client.create({
    email,
    //contraseña: hashedPassword,
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
