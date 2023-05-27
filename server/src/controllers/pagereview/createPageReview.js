const { PageReview } = require("../../db");

const createPageReview = async (
  titulo,
  descripcion,
  cliente_id,
  cliente_nombre,
  cliente_imagen
) => {
  const fecha = new Date().toISOString().slice(0, 10);
  const pageReview = await PageReview.create({
    titulo,
    descripcion,
    cliente_nombre,
    cliente_imagen,
    fecha,
  });

  await pageReview.setClient(cliente_id);

  return pageReview;
};

module.exports = createPageReview;
