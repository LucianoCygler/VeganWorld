const { Admin } = require("../../db");

const updateAdmin = async (id, usuario, contraseña) => {
  const admin = await Admin.findOne({ where: { id } });
  if (!admin) {
    throw new Error(`No se encontró un admin con el id ${id}`);
  }
  if (usuario) admin.usuario = usuario;
  if (contraseña) admin.contraseña = contraseña;

  await admin.save();
  return admin;
};

module.exports = updateAdmin;
