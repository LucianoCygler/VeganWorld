const deleteReview = require("../../controllers/review/deleteReview");

const deleteReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletReview = await deleteReview(id, { deleted: true });
    res.status(200).send(deletReview);
  } catch (error) {
    res.status(500).send(`${error.message}`);
  }
};

module.exports = deleteReviewHandler;
