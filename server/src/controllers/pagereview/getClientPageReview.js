const { PageReview } = require("../../db");

async function getClientPageReview(nombre) {
  const clientPageReview = await PageReview.findOne({
    where: { cliente_nombre: nombre },
  });

  return clientPageReview;
}

module.exports = getClientPageReview;
