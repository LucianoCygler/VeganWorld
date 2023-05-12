const { Review } = require("../../db");

async function getClientPageReview(id) {
  const clientPageReview = await Review.findOne({
    where: { ClientId: id },
  });

  return clientPageReview;
}

module.exports = getClientPageReview;
