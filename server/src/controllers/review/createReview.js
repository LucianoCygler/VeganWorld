const { Review } = require("../../db");

const createReview = async (titulo, descripcion, cliente_id, product_id) => {
  const review = await Review.create({
    titulo,
    descripcion,
  });

  await review.setClient(cliente_id);
  await review.setProduct(product_id);

  return review;
};

module.exports = createReview;
