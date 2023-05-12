const { Review } = require("../../db");

async function getAllClientReviews(id) {
  const allClientReviews = await Review.findAll({
    where: { ClientId: id },
  });

  return allClientReviews;
}

module.exports = getAllClientReviews;
