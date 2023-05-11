const { Review } = require("../../db");

const createReview = async (titulo, descripcion) => {
  const review = await Review.create({
    titulo,
    descripcion,
  }); 
  return review;
};

module.exports = createReview;
