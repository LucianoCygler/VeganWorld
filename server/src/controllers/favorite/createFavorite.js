const  { Favorite } = require("../../db")

const createFavorite = async (product_id, client_id) => {
  const favorite = await Favorite.create()
  await favorite.setClient(client_id)
  await favorite.setProduct(product_id)
  return favorite
}

module.exports = createFavorite;