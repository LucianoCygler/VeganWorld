const deleteAdmin = require("../../controllers/admin/deleteAdmin");

const deleteAdminHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAdmin = await deleteAdmin(id);

    res.status(200).send(deletedAdmin);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = deleteAdminHandler;
