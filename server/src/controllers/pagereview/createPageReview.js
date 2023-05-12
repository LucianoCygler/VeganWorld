const { PageReview } = require("../../db");

const createPageReview = async (titulo, descripcion, cliente_id) => {
  const pageReview = await PageReview.create({
    titulo,
    descripcion,
  });

  await pageReview.setClient(cliente_id);

  return pageReview;
};

module.exports = createPageReview;
