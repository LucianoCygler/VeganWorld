const { Favorite, Product, Client } = require("../../db");

const createFavorite = async (client_id, product_id) => {
  const client = await Client.findByPk(client_id);
  if (!client) throw new Error("El ID del cliente es incorrecto.");

  const product = await Product.findByPk(product_id);
  if (!product) throw new Error("El ID del producto es incorrecto.");

  // Verificar si el favorito ya existe para el cliente y producto específicos
  const existingFavorite = await Favorite.findOne({
    where: {
      client_id: client_id,
      product_id: product_id,
    },
  });

  if (existingFavorite) {
    throw new Error(
      "Este favorito ya existe para el cliente y producto específicos."
    );
  }

  const favorite = await Favorite.create();
  await favorite.setClient(client);
  await favorite.setProduct(product);

  return favorite;
};

module.exports = createFavorite;
