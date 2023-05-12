const { PageReview } = require("../../db");

const getAllPageReview = async () => {
  const allPageReview = await PageReview.findAll();
  return allPageReview;
};

module.exports = getAllPageReview;
