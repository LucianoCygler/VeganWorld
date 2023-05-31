const { Admin } = require("../../db");
const bcrypt = require("bcrypt");

async function createAdmin(usuario, contraseña) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
  const admin = await Admin.create({ usuario, contraseña: hashedPassword });
  return admin;
}

module.exports = createAdmin;
