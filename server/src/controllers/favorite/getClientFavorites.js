const { Favorite } = require("../../db");

async function getClientFavorite(id) {
  const clientFavorites = await Favorite.findAll({
    where: { ClientId: id },
  });

  return clientFavorites;
}

module.exports = getClientFavorite;
