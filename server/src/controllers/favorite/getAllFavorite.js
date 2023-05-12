const { Favorite } = require("../../db");

const getAllFavorite = async () => {
  const allFavorite = await Favorite.findAll();
  return allFavorite;
};

module.exports = getAllFavorite;
