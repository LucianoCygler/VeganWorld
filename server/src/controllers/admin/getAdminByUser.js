const { Admin } = require("../../db");
async function getAdminByUser(usuario) {
  const admin = await Admin.findOne({
    where: { usuario: usuario },
  });

  return admin;
}

module.exports = getAdminByUser;
