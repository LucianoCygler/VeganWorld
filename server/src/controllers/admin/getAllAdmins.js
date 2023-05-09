const { Admin } = require("../../db");

async function getAllAdmins() {
  const allAdmins = await Admin.findAll();
  return allAdmins;
}

module.exports = getAllAdmins;
