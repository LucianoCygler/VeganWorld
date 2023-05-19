const { Review } = require("../../db");

const updateReview = async (id, titulo, descripcion, estrellas) => {
  const reviewById = await Review.findByPk(id);
  if (!reviewById)
    throw Error({ error: `No se encontro con el id ${id} ningun review` });

  if (titulo) reviewById.titulo = titulo;
  if (descripcion) reviewById.descripcion = descripcion;
  if (estrellas) reviewById.estrellas = estrellas;
  await reviewById.save();
  return reviewById;
};

module.exports = updateReview;
