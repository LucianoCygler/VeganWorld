const { Admin } = require("../../db");
async function createAdmin(usuario, contraseña) {
  const admin = await Admin.create({ usuario, contraseña });
  return admin;
}

module.exports = createAdmin;
