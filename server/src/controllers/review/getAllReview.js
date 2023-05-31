const { Review } = require("../../db");

const getAllReview = async () => {
  const allReview = await Review.findAll({ paranoid: true });
  return allReview;
};

module.exports = getAllReview;
