const { Admin } = require("../../db");
const bcrypt = require("bcrypt");

async function getAdminChecked(usuario, contraseña) {
  const admin = await Admin.findOne({
    where: { usuario: usuario },
  });
  if (!admin) throw new Error("Usuario incorrecto");

  const isMatch = await bcrypt.compare(contraseña, admin.contraseña);

  if (!isMatch) {
    throw new Error("Contraseña incorrecta");
  }

  return admin;
}

module.exports = getAdminChecked;
