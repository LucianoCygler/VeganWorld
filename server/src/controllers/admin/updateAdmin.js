const { Admin } = require("../../db");

const updateAdmin = async (id, usuario, contraseña) => {
  const newUsuario = usuario;
  const newContraseña = contraseña;
  const admin = await Admin.findOne({ where: { id } });
  if (!admin) {
    throw new Error(`No se encontró un admin con el id ${id}`);
  }
  if (usuario) admin.nombre = newUsuario;
  if (contraseña) admin.contraseña = newContraseña;

  await admin.save();
  return admin;
};

module.exports = updateAdmin;
