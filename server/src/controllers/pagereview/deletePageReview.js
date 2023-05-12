const { PageReview } = require("../../db");

const deletePageReview = async (id) => {
  const pageReview = await PageReview.findOne({ where: { id } });
  if (!pageReview) {
    throw new Error(`No se encontró ningun review con el id ${id}`);
  }
  await pageReview.destroy();
  return `El Page Review con el id ${id} fue eliminado correctamente `;
};

module.exports = deletePageReview;
