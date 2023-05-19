const updateReview = require("../../controllers/review/updateReview");

const updateReviewHandler = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estrellas } = req.body;

  try {
    const review = await updateReview(id, titulo, descripcion, estrellas);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateReviewHandler;
