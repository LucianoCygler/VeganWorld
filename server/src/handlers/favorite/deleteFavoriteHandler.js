const deleteFavorite = require("../../controllers/favorite/deleteFavorite");

const deleteFavoriteHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletFavorite = await deleteFavorite(id);
    res.status(200).send(deletFavorite);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = deleteFavoriteHandler;
