const { Review } = require("../../db");

async function getAllClientReviews(id) {
  const allClientReviews = await Review.findAll({
    where: { ClientId: id },
    paranoid: false,
  });

  return allClientReviews;
}

module.exports = getAllClientReviews;
