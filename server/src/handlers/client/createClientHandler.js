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
  } = req.body;
  try {
    const client = await getClientByEmail(email);
    if (client) {
      return res
        .status(409)
        .json({ error: "Ya existe un usuario con ese email" });
    } else if (
      !client &&
      email &&
      contraseña &&
      nombre &&
      apellido &&
      ciudad &&
      direccion &&
      telefono &&
      edad
    ) {
      const newClient = await createClient(
        email,
        contraseña,
        nombre,
        apellido,
        ciudad,
        direccion,
        telefono,
        edad,
        dni
      );
      res.status(200).send(newClient);
    } else {
      return res.status(400).send("Faltan ingresar datos");
    }
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = createClientHandler;
