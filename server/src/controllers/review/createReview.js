const { Review } = require("../../db");

const createReview = async (titulo, descripcion, cliente_id, product_id) => {
  const fecha = new Date().toISOString().slice(0, 10);

  const review = await Review.create({
    titulo,
    descripcion,
    fecha,
  });

  await review.setClient(cliente_id);
  await review.setProduct(product_id);

  return review;
};

module.exports = createReview;
