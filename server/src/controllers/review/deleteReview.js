const { Review } = require("../../db");

const deleteReview = async (id) => {
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    throw new Error(`No se encontró ningun review con el id ${id}`);
  }
  await review.destroy();
  return `El Review con el id ${id} fue eliminado correctamente `;
};

module.exports = deleteReview;
