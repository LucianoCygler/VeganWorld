const { Admin } = require("../../db");

async function deleteAdmin(id) {
  const admin = await Admin.findOne({ where: { id } });
  if (!admin) {
    throw new Error(`No se encontró un admin con el id ${id}`);
  }
  await admin.destroy();
  return `el admin con el id ${id} fue eliminado correctamente`;
}

module.exports = deleteAdmin;
