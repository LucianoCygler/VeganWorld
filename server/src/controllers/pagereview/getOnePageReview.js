const { PageReview } = require("../../db");

const getOnePageReview = async (id) => {
  const pageReview = await PageReview.findByPk(id);
  if (!pageReview)
    throw Error(`El id ${id} no se encontro en la base de datos`);
  return pageReview;
};

module.exports = getOnePageReview;
