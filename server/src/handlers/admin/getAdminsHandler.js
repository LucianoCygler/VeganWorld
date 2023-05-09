const getAllAdmins = require("../../controllers/admin/getAllAdmins");
const getAdminByUser = require("../../controllers/admin/getAdminByUser");
const getAdminsHandler = async (req, res) => {
  const { usuario } = req.query;

  try {
    if (usuario) {
      const admin = await getAdminByUser(usuario);
      if (admin) return res.status(200).send(admin);
    }
    const allAdmins = await getAllAdmins();
    res.status(200).send(allAdmins);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAdminsHandler;
