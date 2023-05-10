const { Review } = require("../../db");

const getOneReview = async (id) => {
  const review = await Review.findByPk(id);
  if (!review) throw Error(`El id ${id} no se encontro en la base de datos`);
  return review;
};

module.exports = getOneReview;
