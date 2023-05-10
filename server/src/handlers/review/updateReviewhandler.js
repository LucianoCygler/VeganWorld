const updateReview = require("../../controllers/review/updateReview");

const updateReviewHandler = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;

  try {
    const review = await updateReview(id, titulo, descripcion);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateReviewHandler;
