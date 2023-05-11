const { Review } = require("../../db");

async function getAllProductReviews(id) {
  const allProductReviews = await Review.findAll({
    where: { ProductId: id },
  });

  return allProductReviews;
}

module.exports = getAllProductReviews;
