const updateAdmin = require("../../controllers/admin/updateAdmin");

async function updateAdminHandler(req, res) {
  const { id } = req.params;
  const { usuario, contraseña } = req.body;
  try {
    const modifiedAdmin = await updateAdmin(id, usuario, contraseña);
    res.status(200).send(modifiedAdmin);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
}
module.exports = updateAdminHandler;
