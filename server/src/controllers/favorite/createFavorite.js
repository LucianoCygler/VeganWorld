const { Favorite } = require("../../db");
const getOneClient = require("../client/getOneClient");
const getOneProduct = require("../product/getOneProduct");

const createFavorite = async (client_id, product_id) => {
  const client = await getOneClient(client_id);
  const product = await getOneProduct(product_id);
  if (client && product) {
    const favorite = await Favorite.create();

    await favorite.setClient(client_id);
    await favorite.setProduct(product_id);
    return favorite;
  } else throw new Error("The ID of the customer or the product is incorrect.");
};

module.exports = createFavorite;
