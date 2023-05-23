const getClientChecked = require("../../controllers/client/getClientChecked");

const getClientCheckedHandler = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const client = await getClientChecked(email);
      if (client) return res.status(200).send(client);
      else if (!client)
        return res
          .status(400)
          .send(
            "Dirección de correo electrónico desconocida o contraseña incorrecta"
          );
    } else {
      return res.status(400).send("Faltan ingresar datos");
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getClientCheckedHandler;
