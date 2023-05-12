const updatePageReview = require("../../controllers/pagereview/updatePageReview");

const updatePageReviewHandler = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;

  try {
    const pageReview = await updatePageReview(id, titulo, descripcion);
    res.status(200).json(pageReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePageReviewHandler;
