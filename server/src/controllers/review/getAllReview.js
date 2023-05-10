const { Review } = require("../../db");

const getAllReview = async () => {
  const allReview = await Review.findAll();
  return allReview;
};

module.exports = getAllReview;
