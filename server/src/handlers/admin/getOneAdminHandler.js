const getOneAdmin = require("../../controllers/admin/getOneAdmin");

const getOneAdminHandler = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).send("Por favor proporcione un id");
      return;
    }
    const admin = await getOneAdmin(id);
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getOneAdminHandler;
