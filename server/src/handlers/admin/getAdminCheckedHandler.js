const getAdminChecked = require("../../controllers/admin/getAdminChecked");

const getAdminCheckedHandler = async (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    if ((usuario, contraseña)) {
      const admin = await getAdminChecked(usuario, contraseña);
      if (!admin) {
        return res.status(400).send("Usuario o contraseña incorrecta");
      } else {
        res.status(200).send(admin);
      }
    } else {
      return res.status(400).send("Faltan ingresar datos");
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAdminCheckedHandler;
