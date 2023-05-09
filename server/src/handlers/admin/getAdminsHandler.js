const getAllAdmins = require("../../controllers/admin/getAllAdmins");

const getAdminsHandler = async (req, res) => {
  try {
    const allAdmins = await getAllAdmins();
    res.status(200).send(allAdmins);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getAdminsHandler;
