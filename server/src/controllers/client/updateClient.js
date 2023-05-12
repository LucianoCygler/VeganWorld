const { Client } = require("../../db");

const updateClient = async (
  id,
  email,
  contraseña,
  nombre,
  apellido,
  ciudad,
  direccion,
  telefono,
  edad,
  dni
) => {
  const clientById = await Client.findByPk(id);
  if (!clientById)
    throw new Error({ error: `No customer was found with the ID ${id}. ` });
  if (email) clientById.email = email;
  if (contraseña) clientById.contraseña = contraseña;
  if (nombre) clientById.nombre = nombre;
  if (apellido) clientById.apellido = apellido;
  if (ciudad) clientById.ciudad = ciudad;
  if (direccion) clientById.direccion = direccion;
  if (telefono) clientById.telefono = telefono;
  if (edad) clientById.edad = edad;
  if (dni) clientById.dni = dni;
  await clientById.save();

  return clientById;
};

module.exports = updateClient;
