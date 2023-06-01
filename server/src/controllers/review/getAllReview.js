const { Review } = require("../../db");

const getAllReview = async () => {
  const allReview = await Review.findAll({ paranoid: false });
  return allReview;
};

module.exports = getAllReview;
