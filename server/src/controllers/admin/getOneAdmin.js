const { Admin } = require("../../db");

async function getOneAdmin(id) {
  const admin = await Admin.findByPk(id);
  if (!admin) throw new Error(`El id ${id} no se encontró en la base de datos`);
  return admin;
}

module.exports = getOneAdmin;
