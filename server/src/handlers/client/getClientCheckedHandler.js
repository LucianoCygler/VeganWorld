const getClientChecked = require("../../controllers/client/getClientChecked");
const createClient = require("../../controllers/client/createClient");
const getClientCheckedHandler = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const client = await getClientChecked(email);
      if (!client) {
        // El cliente no existe en la base de datos, así que lo creamos
        const newClient = await createClient(email); // Supongamos que hay una función createClient que crea el cliente en la base de datos
        return res.status(201).send(newClient);
      }
    } else {
      return res.status(400).send("Faltan ingresar datos");
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getClientCheckedHandler;
