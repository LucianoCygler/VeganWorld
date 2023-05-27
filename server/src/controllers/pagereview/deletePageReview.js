const { PageReview } = require("../../db");

const deletePageReview = async (id, data) => {
  const pageReview = await PageReview.findOne({ where: { id } });
  if (!pageReview) {
    throw new Error(`No se encontró ningun review con el id ${id}`);
  }
  await pageReview.update(data);
  await pageReview.destroy({ force: false });
  return `El Page Review con el id ${id} fue eliminado correctamente `;
};

module.exports = deletePageReview;
