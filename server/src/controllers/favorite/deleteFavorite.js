const { Favorite } = require("../../db");

const deleteFavorite = async (id) => {
  const favorite = await Favorite.findOne({ where: { id } });
  if (!favorite) {
    throw Error(`No se encontro ningun favorite con el id ${id}`);
  }
  await favorite.destroy();
  return `El Favorite con el id ${id} fue eliminado correctamente`;
}; 

module.exports = deleteFavorite;
