const { Review } = require("../../db");
const getOneClient = require("../../controllers/client/getOneClient");

const createReview = async (
  titulo,
  descripcion,
  estrellas,
  cliente_id,
  product_id,
  cliente_nombre,
  cliente_imagen
) => {
  const fecha = new Date().toISOString().slice(0, 10);
  const review = await Review.create({
    titulo,
    descripcion,
    estrellas,
    fecha,
    cliente_nombre,
    cliente_imagen,
  });

  await review.setClient(cliente_id);
  await review.setProduct(product_id);

  return review;
};

module.exports = createReview;
