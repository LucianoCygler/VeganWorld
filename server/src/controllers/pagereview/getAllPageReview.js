const { PageReview } = require("../../db");

const getAllPageReview = async () => {
  const allPageReview = await PageReview.findAll({ paranoid: false });
  return allPageReview;
};

module.exports = getAllPageReview;
