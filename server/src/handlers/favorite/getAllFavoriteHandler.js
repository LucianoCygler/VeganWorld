const getAllFavorite = require("../../controllers/favorite/getAllFavorite");

const getAllFavoriteHandler = async (req, res) => {
  const allFavorite = await getAllFavorite();
  try {
    res.status(200).send(allFavorite);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = getAllFavoriteHandler;
