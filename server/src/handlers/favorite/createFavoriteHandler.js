const createFavorite = require("../../controllers/favorite/createFavorite");


const createFavoriteHandler = async (req, res) => {
  const { product_id, client_id } = req.body;
  try {
    const newFavorite = await createFavorite(product_id, client_id);
    res.status(200).send(newFavorite);
  } catch (error) {
    res.status(500).send(`${error.message}`); 
  }
};

module.exports = createFavoriteHandler;
