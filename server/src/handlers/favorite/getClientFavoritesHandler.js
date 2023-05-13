const getClientFavorites = require("../../controllers/favorite/getClientFavorites");

const getClientFavoritesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const clientFavorites = await getClientFavorites(id);
    if (!clientFavorites) throw new Error("There aren´t favs");
    res.status(200).send(clientFavorites);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};
module.exports = getClientFavoritesHandler;
