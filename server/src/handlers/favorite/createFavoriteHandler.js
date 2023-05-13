const createFavorite = require("../../controllers/favorite/createFavorite");

const createFavoriteHandler = async (req, res) => {
  const { client_id, product_id } = req.body;
  try {
    const newFavorite = await createFavorite(client_id, product_id);

    res.status(200).send(newFavorite);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = createFavoriteHandler;
