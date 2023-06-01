const { PageReview } = require("../../db");

async function getClientPageReview(id) {
  const clientPageReview = await PageReview.findOne({
    where: { ClientId: id },
  });

  return clientPageReview;
}

module.exports = getClientPageReview;
