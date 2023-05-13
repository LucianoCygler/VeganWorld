const { Favorite, Product } = require("../../db");

async function getClientFavorites(id) {
  const clientFavorites = await Favorite.findAll({
    where: { ClientId: id },
    include: Product, // Incluye el modelo Product en la consulta
  });

  return clientFavorites;
}

module.exports = getClientFavorites;
