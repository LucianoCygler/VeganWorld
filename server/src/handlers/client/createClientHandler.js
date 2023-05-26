const createClient = require("../../controllers/client/createClient");
const getClientByEmail = require("../../controllers/client/getClientByEmail");

const createClientHandler = async (req, res) => {
  const {
    email,
    contraseña,
    nombre,
    apellido,
    ciudad,
    direccion,
    telefono,
    edad,
    dni,
    imagen,
  } = req.body;
  try {
    const client = await getClientByEmail(email);

    if (client) {
      return res
        .status(409)
        .json({ error: "There is already a user with that email." });
    } else if (!client && email) {
      const newClient = await createClient(
        email,
        contraseña || "",
        nombre || "",
        apellido || "",
        ciudad || "",
        direccion || "",
        telefono || "",
        edad || null,
        dni || "",
        imagen || ""
      );
      res.status(200).send(newClient);
    } else {
      return res.status(400).send("Some data is missing.");
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createClientHandler;
