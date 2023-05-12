const { PageReview } = require("../../db");

const updatePageReview = async (id, titulo, descripcion) => {
  const pageReviewById = await PageReview.findByPk(id);
  if (!pageReviewById)
    throw Error({ error: `No se encontro con el id ${id} ningun Page Review` });

  if (titulo) pageReviewById.titulo = titulo;
  if (descripcion) pageReviewById.descripcion = descripcion;
  await pageReviewById.save();
  return pageReviewById;
};

module.exports = updatePageReview;
