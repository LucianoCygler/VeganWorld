const { Review } = require("../../db");

const deleteReview = async (id, data) => {
  const review = await Review.findOne({ where: { id } });
  if (!review) {
    throw new Error(`No se encontró ningun review con el id ${id}`);
  }
  await review.update(data);
  await review.destroy({ force: true });
  return `El Review con el id ${id} fue eliminado correctamente `;
};

module.exports = deleteReview;
