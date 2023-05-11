const { Review } = require("../../db");

const getReviewByTitulo = async (titulo) => {
  const review = await Review.findOne({
    where: { titulo },
  });
  if (!review) {
    throw Error(`El titulo ${titulo} no se encontro en la base de datos`);
  }
  return review;
};

module.exports = getReviewByTitulo;
